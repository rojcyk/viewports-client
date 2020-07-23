export const selectOS = (width: number, height: number): number => {
  const dimensions = width + 'x' + height

  switch (dimensions) {
    case '320x568':
    case '375x667':
    case '414x736':
      return 1
    case '360x640':
    case '375x812':
    case '412x732':
    case '412x824':
    case '412x846':
    case '412x847':
    case '414x896':
      return 2
    default:
      return 0
  }
}