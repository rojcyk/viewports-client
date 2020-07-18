import * as React from 'react'
import * as ReactDOM from 'react-dom'

;(async (): Promise<void> => {
  const htmlID = 'react-page'
  const node = document.getElementById(htmlID)

  if (!node) throw new Error(`Node  ${htmlID} exists `)

  ReactDOM.render(
    <div>Hello world!</div>,
    node,
  )
})()
