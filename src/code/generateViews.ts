// TOok heavy inspiration and copied stum stuff from Brian Lovin
// https://github.com/brianlovin/figma-responsify/blob/main/src/createAndPlace.ts

interface CreateAndPlaceProps {
  view: Client.Viewport,
  views: Client.Viewport[],
  selectedNode: SelectedNode,
  index: number
}

type SelectedNode = FrameNode | ComponentNode | InstanceNode

const placeFrame = (frame: SelectedNode, props: CreateAndPlaceProps) => {
  const { view, views, selectedNode, index } = props

  const startPos = selectedNode.x + selectedNode.width + 100

  frame.resize(view.display.width, view.display.height)
  frame.name = `${frame.name} - ${view.share}%`

  // for each subsequent device being tested, make sure it is always
  // placed 100px to the right of the previous device
  const widthOfAllPreviousFramesPlusGaps = views
    .slice(0, index)
    .reduce((acc, curr) => acc += curr.display.width + 100, startPos)

  const x = widthOfAllPreviousFramesPlusGaps
  frame.x = x
  // top-align the containers to the selected node
  frame.y = selectedNode.y
  return frame
}

export function createAndPlaceFrame(props: CreateAndPlaceProps) {  
  const { selectedNode } = props

  switch (selectedNode.type) {
    case 'FRAME':
      const frame = selectedNode.clone()
      placeFrame(frame, props)
      return frame

    case 'COMPONENT':
      const component = selectedNode.createInstance()
      placeFrame(component, props)
      return component

    case 'INSTANCE':
      const instance = selectedNode.clone()
      placeFrame(instance, props)
      return instance
  }
}

export default createAndPlaceFrame