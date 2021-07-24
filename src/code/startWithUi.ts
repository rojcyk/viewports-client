import io from 'figmaio/code'

import { APP_START } from '../constants/events'

import updateListener from './listeners/updateListener'
import regionListener from './listeners/regionListener'
import resizeListener from './listeners/resizeListener'

export default async (initData: Client.InitData) => {
  const { viewports, region } = initData

  switch (figma.command) {
    case 'generateMobile':
      const viewsMobile = viewports.mobile[region]

      viewsMobile.forEach((view: Client.Viewport) => {
        let newFrame = figma.createFrame()
        newFrame.name = `${view.display.width}x${view.display.height} - ${view.share}%`
        newFrame.resize(view.display.width, view.display.height)
      })

      figma.closePlugin()
      break
    case 'generateTablet':
      const viewsTablet = viewports.tablet[region]
      break
    case 'generateDesktop':
      const viewsDesktop = viewports.mobile[region]
      break
    default:
      figma.showUI(__html__, {
        width: 300,
        height: 480
      })

      /* Finally, sending the actual data over to the client */
      io.send(APP_START, initData)

      /* We are listening for events that might come from the plugin, such as update */
      updateListener()
      regionListener()
      resizeListener()
      
      break
  }
}