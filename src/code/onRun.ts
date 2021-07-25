import io from 'figmaio/code'

import { APP_START } from '../constants/events'
import { VIEWPORTS, REGION } from '../constants/storageProps'
import shouldCheck from './utils/shouldCheck'
import generateViews from './utils/generateViews'
import updateListener from './listeners/updateListener'
import regionListener from './listeners/regionListener'
import resizeListener from './listeners/resizeListener'

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

figma.on('run', async ({ command, parameters }) => {
  console.log(`[Viewports] Command: ${command}`)
  console.log(`[Viewports] params: ${parameters}`)

  /* We are getting the data saved in Figma client */
  const viewports = await figma.clientStorage.getAsync(VIEWPORTS)
  const region = await figma.clientStorage.getAsync(REGION)

  /* We are checking whether it was longer than 24 since we last opened the plugin */
  const shouldCheckCache = await shouldCheck()

  // If the data is not available, or it was too long ago that we last checked,
  // then we need to check for new data
  const cacheValid = viewports && !shouldCheckCache ? true : false

  /* Initial data construction */
  const initData: Client.InitData = {
    cacheValid,
    viewports,
    region: region ? region : 'ww'
  }

  // const initData: Client.InitData = {
  //   cacheValid: false,
  //   viewports: undefined,
  //   region: 'ww'
  // }

  // if (parameters) {
  //   await startWithParams(initData)
  // } else {
  //   await startWithUi(initData)
  // }

  switch (figma.command) {
    case 'generateMobile':
    case 'generateTablet':
    case 'generateDesktop':
      const platformRegex = /generate(Mobile|Tablet|Desktop)/g
      const platformResult = platformRegex.exec(figma.command)
      const platform = platformResult ? platformResult[1].toLowerCase() : 'mobile'

      console.log(`[Viewports] Generating ${platform} views`)

      if (!initData.cacheValid) {
        launchUI(initData, '⚡️ Launching UI to download the data.')
      } else {
        generateViews(viewports[platform][initData.region])
        figma.closePlugin()
      }
      break
    default:
      launchUI(initData)
      break
  }
})