import * as React from 'react'
import dayjs from 'dayjs'
import io from 'figmaio/ui'
import downloadViewports from '../helpers/downloadViewports'
import { DATA_UPDATE } from '../constants/events'

// ******************** //
// APP MAIN CLASS
// ******************** //

export default class App extends React.Component<Client.InitData, Client.AppState> {
  public constructor(props: Client.InitData) {
    super(props)

    this.state = {
      viewports: props.viewports,
      cacheValid: props.cacheValid,
      update: 'init',
    }
  }

  // ************************************************ //
  // Function that handles press on a display entity.
  // ************************************************ //

  displayTrigger = async (e: React.MouseEvent): Promise<void> => {
    console.log('display trigger')
  }

  // ************************************************ //
  // Function that handles press on a Continent item.
  // ************************************************ //

  continentTrigger = (e: React.MouseEvent): void => {
    console.log('continent trigger')
  }

  // ************************************************ //
  // Function that handles press on a platform item.
  // ************************************************ //

  platformTrigger = async (e: React.MouseEvent): Promise<void> => {
    console.log('platform trigger')
  }

  // ************************************************ //
  // Function that handles what happens when 
  // update is finished
  // ************************************************ //

  updateFinishedTrigger = async (e: React.MouseEvent): Promise<void> => {
    // this.props.updateFinishedTrigger(e)
  }

  // ************************************************ //
  // Logic checking what is the state of data and whether
  // it requires a restart 
  // ************************************************ //

  public async componentDidMount(): Promise<void> {
    if (this.state.cacheValid === false) {
      console.log('[Viewports] Outdated ...')
      console.log('[Viewports] Downloading new data ...')

      this.setState({ update: 'updating' })

      const newViewportsResponse = await downloadViewports()

      if (newViewportsResponse.status === 200) {
        this.setState({
          cacheValid: true,
          update: 'done',
          viewports: newViewportsResponse.data.data as Client.ViewportsData
        })

        io.send(DATA_UPDATE, {
          lastCheck: dayjs().toDate().toString(),
          viewports: newViewportsResponse.data.data
        })
      } else {
        this.setState({
          cacheValid: false,
          update: 'error'
        })
      }
    } else {
      console.log('[Viewports] Data up to date')
    }

    console.log(`[Viewports]: Current app state:`)
    console.log(this.state)
  }

  // ************************************************ //
  // Main render method
  // ************************************************ //

  public render(): React.ReactNode {
    return (
      <div>
        Hello world!
      </div>
    )
  }
}