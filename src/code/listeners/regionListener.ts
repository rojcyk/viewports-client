import io from 'figmaio/code'
import { REGION_UPDATE } from '../../constants/events'
import { REGION } from '../../constants/storageProps'

export default async (): Promise<void> => {
  io.on(
    REGION_UPDATE,
    async (data): Promise<void> => {
      console.log(`[Viewports] Updating selected region`)
      await figma.clientStorage.setAsync(REGION, data)
    },
  )
}