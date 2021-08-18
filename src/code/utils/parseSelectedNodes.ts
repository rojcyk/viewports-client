export const parseSelectedNodes = (nodes: readonly SceneNode[]) => {
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

export default parseSelectedNodes