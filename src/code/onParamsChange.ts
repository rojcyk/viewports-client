// The 'change' event listens for text change in the Quick Actions box.
figma.parameters.on('input', ({ parameters, key, query, result}) => {
  switch (key) {
    case 'platform':
      const platforms = [
        { name: 'Mobile', data: 'mobile', icon:`
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.442 27.442" xml:space="preserve">
            <path d="M19.494 0H7.948a1.997 1.997 0 0 0-1.997 1.999v23.446c0 1.102.892 1.997 1.997 1.997h11.546a1.998 1.998 0 0 0 1.997-1.997V1.999A1.999 1.999 0 0 0 19.494 0zm-8.622 1.214h5.7c.144 0 .261.215.261.481s-.117.482-.261.482h-5.7c-.145 0-.26-.216-.26-.482s.115-.481.26-.481zm2.85 24.255a1.275 1.275 0 1 1 0-2.55 1.275 1.275 0 0 1 0 2.55zm6.273-4.369H7.448V3.373h12.547V21.1z"/>
          </svg>
        `
      },
        { name: 'Tablet', data: 'tablet', icon: `
          <svg xmlns="http://www.w3.org/2000/svg" width="955.4" height="955.4" xml:space="preserve">
            <path d="M165.351 0c-32.6 0-59 26.4-59 59v836.4c0 33.1 26.9 60 60 60H789.05c33.102 0 60-26.9 60-60V59c0-32.6-26.398-59-59-59H165.351zM477.75 896.1c-23.4 0-42.3-18.9-42.3-42.299 0-23.4 18.899-42.301 42.3-42.301 23.401 0 42.299 18.9 42.299 42.301.001 23.398-18.898 42.299-42.299 42.299zm295.401-170.7c0 16.6-13.4 30-30 30h-530.8c-16.6 0-30-13.4-30-30V104.9c0-16.6 13.4-30 30-30H743.05c16.602 0 30 13.4 30 30v620.5h.101z"/>
          </svg>
        ` },
        { name: 'Desktop', data: 'desktop', icon: `
          <svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path d="M928 140H96c-17.7 0-32 14.3-32 32v496c0 17.7 14.3 32 32 32h380v112H304c-8.8 0-16 7.2-16 16v48c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-48c0-8.8-7.2-16-16-16H548V700h380c17.7 0 32-14.3 32-32V172c0-17.7-14.3-32-32-32zm-40 488H136V212h752v416z"/>
          </svg>
        ` }
      ]
      result.setSuggestions(platforms.filter(s => s.data.includes(query)))
      break
    case 'region':
      //const regions = ['ww', 'eu', 'na', 'sa', 'oc', 'af']//.sort(function(x,y){ return x == region ? -1 : y == region ? 1 : 0; })

      const regions = [
        {data: 'ww', name: 'World wide'},
        {data: 'eu', name: 'Europe'},
        {data: 'af', name: 'Africa'},
        {data: 'na', name: 'North America'},
        {data: 'sa', name: 'South America'},
        {data: 'oc', name: 'Oceania'},
      ]

      // const regions = [
      //   'World wide',
      //   'Africa',
      //   'Asia',
      //   'Europe',
      //   'Oceania',
      //   'North America',
      //   'South America'
      // ]

      // Making sure the previous selection is the first result
      // Might do the same for platforms
      // markets.unshift(markets.splice(markets.indexOf(region), 1)[0])

      result.setSuggestions(regions.filter(s => s.name.toLowerCase().includes(query.toLowerCase())))
      break
    default:
      return
  }
})