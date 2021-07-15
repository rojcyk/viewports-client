import io from 'figmaio/code'
import { DISPLAY_UPDATE } from '../../constants/events'
import resizeSelection from '../resizeSelection'

export default (): void => {
  io.on(
    DISPLAY_UPDATE,
    async (
      dimensions: { width: number; height: number }
    ): Promise<void> => resizeSelection(dimensions.width, dimensions.height)
  )
}
