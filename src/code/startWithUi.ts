import io from 'figmaio/code'

import { APP_START } from '../constants/events'

import updateListener from './listeners/updateListener'
import regionListener from './listeners/regionListener'
import resizeListener from './listeners/resizeListener'

import createAndPlaceFrame from './generateViews'

const { currentPage } = figma
const { selection } = currentPage

const parseSelection = (nodes: readonly SceneNode[]) => {
  const oneSelected = nodes.length > 0
  if (!oneSelected) {
    figma.notify(' ⚡️ You need to select something first')
    return null
  }

  const firstSelected = nodes[0]

  switch (firstSelected.type) {
    case 'FRAME':
    case 'COMPONENT':
    case 'INSTANCE':
    case 'RECTANGLE':
    case 'BOOLEAN_OPERATION':
    case 'GROUP':
    case 'SLICE':
    case 'TEXT':
    case 'VECTOR':
      return firstSelected
    default:
      figma.notify(`⚡️ The layer type ${firstSelected.type} is not supported.`)
      return null
  }
}

const generateViews = (views: Client.Viewport[]) => {
  const selectedNode = parseSelection(selection)
  if (selectedNode === null) return

  let frames: SceneNode[] = []

  views.forEach((view: Client.Viewport, index: number) => {
    frames.push(createAndPlaceFrame({
      view,
      views,
      index,
      selectedNode
    }))
  })

  figma.currentPage.selection = frames
  figma.viewport.scrollAndZoomIntoView(frames)

  return frames
}

export default async (initData: Client.InitData) => {
  const { viewports, region } = initData

  switch (figma.command) {
    case 'generateMobile':
      console.log('[Viewports] Generating mobile views')
      generateViews(viewports.mobile[region])
      figma.closePlugin()
      break
    case 'generateTablet':
      console.log('[Viewports] Generating tablet views')
      generateViews(viewports.tablet[region])
      figma.closePlugin()
      break
    case 'generateDesktop':
      console.log('[Viewports] Generating desktop views')
      generateViews(viewports.desktop[region])
      figma.closePlugin()
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