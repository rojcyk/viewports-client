import * as React from 'react'
import * as ReactDOM from 'react-dom'
import io from 'figmaio/ui'


// ******************** //
// Figma hacks
// ******************** //

declare function require(path: string): any

// ******************** //
// UI
// ******************** //

;(async (): Promise<void> => {
  // if (io) {
    const data = (await io.async('start'))
    console.log(data)
    
    const htmlID = 'react-page'
    const node = document.getElementById(htmlID)

    if (!node) throw new Error(`Node  ${htmlID} exists `)

    ReactDOM.render(
      <div>Yeah</div>,
      node,
    )
  // }
})()
