import resizeSelection from './resizeSelection'

// Starting the plugin in parameter mode.
export default async (initData: Client.InitData) => {
  const { viewports, region } = initData

  console.log('[Viewports] Initiating parameter listeners')

  // The 'change' event listens for text change in the Quick Actions box.
  figma.parameters.on('change', (parameters: ParameterValues, currentKey: string, result: SuggestionResults) => {
    const query = parameters[currentKey]

    switch (currentKey) {
      case 'platform':
        const platforms = ['mobile', 'tablet', 'desktop']
        result.setSuggestions(platforms.filter(s => s.includes(query)))
        break
      case 'market':
        const markets = ['ww', 'eu', 'na', 'sa', 'oc', 'af']//.sort(function(x,y){ return x == region ? -1 : y == region ? 1 : 0; })

        // Making sure the previous selection is the first result
        // Might do the same for platforms
        markets.unshift(markets.splice(markets.indexOf(region), 1)[0])

        result.setSuggestions(markets.filter(s => s.includes(query)))
        break
      default:
        return
    }
  })
}