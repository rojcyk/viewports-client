import * as React from 'react'
import * as ReactDOM from 'react-dom'
import io from 'figmaio/ui'

import App from './app'

// ******************** //
// Figma hacks
// ******************** //

declare function require(path: string): any

// ******************** //
// UI
// ******************** //

const main = async () => {
  /* We are waiting from data coming from the code part of the app */ 
  const data = (await io.async('start'))

  console.log(`[Viewports]: App props:`)
  console.log(data)

  /* We are looking for a node (html element) with an ID */
  const htmlID = 'react-page'
  const node = document.getElementById(htmlID)

  if (!node) throw new Error(`Node ${htmlID} does not exists `)

  /* If found, we add content to it */
  ReactDOM.render(
    <App {...data} />,
    node,
  )
}

// ******************** //
// Running the main function
// ******************** //

main()
