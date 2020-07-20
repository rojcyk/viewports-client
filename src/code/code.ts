/// //////
// Main //
import io from 'figmaio/code'
import dayjs from 'dayjs'
import { LAST_CHECK, VIEWPORTS } from '../constants/storageProps'
import updateListener from './updateListener'

const shouldCheck = async (): Promise<boolean> => {
  // Getting the last check date from Figma storage
  const lastCheck = await figma.clientStorage.getAsync(LAST_CHECK)

  // If the property is not found, we are returning true by default
  if (lastCheck === undefined || lastCheck === null) return true

  // Getting the current time, and we are substracting 24hs, that is our cache window
  const last24 = dayjs().subtract(1, 'day').toDate().toString()

  // Finally, we are checking whether we opened the plugin prior to the last 24 hours or not *?
  const shouldCheck = dayjs(lastCheck).isBefore(last24, 'day')

  return shouldCheck
}

const main = async () => {
  figma.showUI(__html__, {
    width: 320,
    height: 480
  })

  /* We are getting the data saved in Figma client */
  const viewports = await figma.clientStorage.getAsync(VIEWPORTS)

  /* We are checking whether it was before 24 that we last opened the plugin */
  const shouldCheckCache = await shouldCheck()

  /* If the data is not available, or it was too long ago that we last checked,
   * then we need to check for new data */
  const cacheValid = viewports && !shouldCheckCache ? true : false

  /* Initial data construction */
  const initData: Client.InitData = {
    cacheValid,
    viewports
  }

  /* Finally, sending the actual data over to the client */
  io.send('start', initData)

  /* We are listening for events that might come from the plugin, such as update */
  updateListener()
}

main()
