export default (width: number, height: number) => {
  const selection = figma.currentPage.selection
  console.log(`[Viewports] Resizing to ${width}x${height}`)

  if (selection.length > 0) {
    selection.forEach(el => {
      switch (el.type) {
        case 'SLICE':
        case 'FRAME':
        case 'COMPONENT':
        case 'INSTANCE':
        case 'RECTANGLE':
          el.resize(width, height)
          el.setRelaunchData({})
          el.setRelaunchData({
            edit: 'Change the viewport based on the market share.',
          })
          break
      }
    })

    figma.viewport.scrollAndZoomIntoView(figma.currentPage.selection)
  } else {
    // figma.notify('You need to select something first ⚡️')
    let newFrame = figma.createFrame()
    newFrame.resize(width, height)
    // newFrame.name 
    figma.viewport.scrollAndZoomIntoView([newFrame])
  }
}