;(async (): Promise<void> => {
  const htmlID = 'react-page'
  const node = document.getElementById(htmlID)

  if (!node) throw new Error(`Node  ${htmlID} exists `)

  ReactDOM.render(
    // <App {...props} />,
    <div>Hello world!</div>,
    node,
  )
})()
