import io from 'figmaio/code'
import { DATA_UPDATE } from '../../constants/events'
import { LAST_CHECK, VIEWPORTS } from '../../constants/storageProps'

export default async (): Promise<void> => {
  io.on(
    DATA_UPDATE,
    async (data): Promise<void> => {
      console.log(`[Viewports] Recieved the updated data and saving them to Figma`)
      await figma.clientStorage.setAsync(VIEWPORTS, data.viewports)
      await figma.clientStorage.setAsync(LAST_CHECK, data.lastCheck)
    },
  )
}