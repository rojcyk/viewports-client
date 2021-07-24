import { VIEWPORTS, REGION } from '../constants/storageProps'
import shouldCheck from './shouldCheck'
import startWithParams from './startWithParams'
import startWithUi from './startWithUi'

figma.on('run', async ({ command, parameters }) => {
  console.log(`[Viewports] Command: ${figma.command}`)

  /* We are getting the data saved in Figma client */
  const viewports = await figma.clientStorage.getAsync(VIEWPORTS)
  const region = await figma.clientStorage.getAsync(REGION)

  /* We are checking whether it was longer than 24 since we last opened the plugin */
  const shouldCheckCache = await shouldCheck()

  // If the data is not available, or it was too long ago that we last checked,
  // then we need to check for new data
  const cacheValid = viewports && !shouldCheckCache ? true : false

  /* Initial data construction */
  const initData: Client.InitData = {
    cacheValid,
    viewports,
    region: region ? region : 'ww'
  }

  if (parameters) {
    await startWithParams(initData)
  } else {
    await startWithUi(initData)
  }
})

