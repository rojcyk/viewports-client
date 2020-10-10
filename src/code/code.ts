import io from 'figmaio/code'

import { VIEWPORTS, REGION } from '../constants/storageProps'
import { APP_START } from '../constants/events'

import updateListener from './updateListener'
import regionListener from './regionListener'
import resizeListener from './resizeListener'
import shouldCheck from './shouldCheck'

const main = async () => {
  figma.showUI(__html__, {
    width: 300,
    height: 480
  })

  /* We are getting the data saved in Figma client */
  const viewports = await figma.clientStorage.getAsync(VIEWPORTS)

  /* We are getting the data saved in Figma client */
  const region = await figma.clientStorage.getAsync(REGION)

  /* We are checking whether it was before 24 that we last opened the plugin */
  const shouldCheckCache = await shouldCheck()

  /* If the data is not available, or it was too long ago that we last checked,
   * then we need to check for new data */
  const cacheValid = viewports && !shouldCheckCache ? true : false

  /* Initial data construction */
  const initData: Client.InitData = {
    cacheValid,
    viewports,
    region
  }

  /* When launching the plugin, figma sets a command 
   * if it standard launch, the command is empty
   * if it is launched from the edit button, it says "edit"
   */
  switch (figma.command) {
    /* so far, we don't differentiate */
    default:
      /* Finally, sending the actual data over to the client */
      io.send(APP_START, initData)
      break
  }

  /* We are listening for events that might come from the plugin, such as update */
  updateListener()
  regionListener()
  resizeListener()
}

main()
