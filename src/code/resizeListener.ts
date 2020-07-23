import io from 'figmaio/code'
import { DISPLAY_UPDATE } from '../constants/events'

export default (): void => {
  io.on(
    DISPLAY_UPDATE,
    async (dimensions: { width: number; height: number }): Promise<void> => {
      const selection = figma.currentPage.selection

      console.log(`[Viewports] Resizing to ${dimensions.width}x${dimensions.height}`)

      if (selection.length > 0) {
        selection.forEach(el => {
          switch (el.type) {
            case 'SLICE':
            case 'FRAME':
            case 'COMPONENT':
            case 'INSTANCE':
            case 'RECTANGLE':
              el.resize(dimensions.width, dimensions.height)
              el.setRelaunchData({})
              el.setRelaunchData({
                edit: 'Change the viewport based on the market share.',
              })
              break
          }
        })

        figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection)
      } else {
        figma.notify('You need to select something first ⚡️')
        // let newFrame = figma.createFrame()
        // newFrame.resize(parseInt(display.width), parseInt(display.height))
        // figma.viewport.scrollAndZoomIntoView([newFrame])
      }
    },
  )
}
