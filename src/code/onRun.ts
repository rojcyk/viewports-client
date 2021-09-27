import io from 'figmaio/code'

import { APP_START } from '../constants/events'
import { VIEWPORTS, REGION, LAST_PLATFORM, LAST_REGION } from '../constants/storageProps'
import shouldCheck from './utils/shouldCheck'
import generateViews from './utils/generateViews'
import resizeSelection from './utils/resizeSelection'
import updateListener from './listeners/updateListener'
import regionListener from './listeners/regionListener'
import resizeListener from './listeners/resizeListener'

const COPY_NO_DATA = '⚡️ Plugin needs to launch UI to download the data.'

const pickMarket = (market: string) => {
  switch (market) {
    case 'World wide': return 'ww'
    case 'Africa': return 'af'
    case 'Asia': return 'as'
    case 'Europe': return 'eu'
    case 'Oceania': return 'oc'
    case 'North America': return 'na'
    case 'South America': return 'sa'
  }
}

const launchUI = (data: Client.InitData, message?: string) => {
  figma.showUI(__html__, {
    width: 300,
    height: 480
  })

  /* Finally, sending the actual data over to the client */
  io.send(APP_START, data)

  /* We are listening for events that might come from the plugin, such as update */
  updateListener()
  regionListener()
  resizeListener()

  if (message) figma.notify(message)
}

figma.on('run', async (props) => {
  console.log(`[Viewports] Command: ${props?.command}`)
  console.log(`[Viewports] params:`)
  console.log(props?.parameters)

  /* We are getting the data saved in Figma client */
  const viewports = await figma.clientStorage.getAsync(VIEWPORTS) as Client.ViewportsData | undefined
  const region = await figma.clientStorage.getAsync(REGION) as Client.RegionCode || 'ww'

  /* We are checking whether it was longer than 24 since we last opened the plugin */
  const shouldCheckCache = await shouldCheck()

  // If the data is not available, or it was too long ago that we last checked,
  // then we need to check for new data
  const cacheValid = viewports && !shouldCheckCache ? true : false

  /* Initial data construction */
  const initData: Client.InitData = {
    cacheValid,
    viewports,
    region
  }

  switch (figma.command) {
    case 'generateMobile':
    case 'generateTablet':
    case 'generateDesktop':
      const platformRegex = /generate(Mobile|Tablet|Desktop)/g
      const platformResult = platformRegex.exec(figma.command)
      const platformName = platformResult ? platformResult[1].toLowerCase() as Client.PlatformCode : 'mobile' as Client.PlatformCode

      console.log(`[Viewports] Generating ${platformName} views`)

      if (viewports) {
        const regionData = viewports[platformName][region]

        generateViews(regionData)
        figma.closePlugin()
      } else {
        launchUI(initData, COPY_NO_DATA)
      }
      break
    case 'resize':
      if (viewports) {
        if (props?.parameters) {
          const selected_region = props?.parameters.region as Client.RegionCode
          const selected_platform = props?.parameters.platform as Client.PlatformCode

          await figma.clientStorage.setAsync(LAST_REGION, selected_region)
          await figma.clientStorage.setAsync(LAST_PLATFORM, selected_platform)

          const { display } = viewports[selected_platform][selected_region][0]

          figma.notify(`⚡️ Resizing to ${display.width}x${display.height}.`)
          resizeSelection(display.width, display.height)
          figma.closePlugin()
        } else {
          const previous_region = await figma.clientStorage.getAsync(LAST_REGION) as Client.RegionCode
          const previous_platform = await figma.clientStorage.getAsync(LAST_PLATFORM) as Client.PlatformCode

          let view: Client.Viewport
          
          if (previous_region && previous_platform) {
            view = viewports[previous_platform][previous_region][0]
            figma.notify(`⚡️ Resizing to previous selection ${previous_platform} - ${previous_region}.`)
          } else {
            view = viewports['mobile'][region][0]
            figma.notify(`⚡️ Using the most popular view size ${view.display.width}x${view.display.height} by default.`)
          }

          resizeSelection(view.display.width, view.display.height)
          figma.closePlugin()
        }
      } else {
        launchUI(initData, COPY_NO_DATA)
      }
      break
    default:
      launchUI(initData)
      break
  }
})