import io from 'figmaio/code'

import { VIEWPORTS, REGION } from '../constants/storageProps'
import { APP_START } from '../constants/events'

import updateListener from './listeners/updateListener'
import regionListener from './listeners/regionListener'
import resizeListener from './listeners/resizeListener'
import shouldCheck from './shouldCheck'
import startWithParams from './startWithParams'

const main = async () => {
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
    region
  }

  console.log(`[Viewports] Query mode: ${figma.parameters.queryMode}`)
  console.log(`[Viewports] Command: ${figma.command}`)

  if (figma.parameters.queryMode) {
    // We are starting the plugin from the quick action menu
    await startWithParams(viewports, region)
  } else {  
    /* When launching the plugin, figma sets a command 
    * if its standard launch, the command is empty
    * if its launched from the edit button, it says "edit"
    */
    switch (figma.command) {
      default:
        figma.showUI(__html__, {
          width: 300,
          height: 480
        })

        /* Finally, sending the actual data over to the client */
        io.send(APP_START, initData)

        /* We are listening for events that might come from the plugin, such as update */
        updateListener()
        regionListener()
        resizeListener()
        
        break
    }
  }
}

main()
