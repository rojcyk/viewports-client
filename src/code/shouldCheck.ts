import dayjs from 'dayjs'
import { LAST_CHECK } from '../constants/storageProps'

export default async (): Promise<boolean> => {
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