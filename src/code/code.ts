/// //////
// Main //
import io from 'figmaio/code'

;(async (): Promise<void> => {
  figma.showUI(__html__, {
    width: 320,
    height: 480
  })

  if (io) io.send('start', { hovno: 'hovno hovno' })
})()
