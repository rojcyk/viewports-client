import * as React from 'react'
import dayjs from 'dayjs'
import io from 'figmaio/ui'
import Rollbar from 'rollbar'
import styled from 'styled-components'

import downloadViewports from '../helpers/downloadViewports'
import { DATA_UPDATE, REGION_UPDATE } from '../constants/events'
import { GlobalStyles } from './globalStyles'
import { UpdateBanner } from './updateBanner'
import RegionSelect from './region/index'

// ******************** //
// APP MAIN CLASS
// ******************** //

const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
` 

export default class App extends React.Component<Client.InitData, Client.AppState> {
  public constructor(props: Client.InitData) {
    super(props)

    this.state = {
      viewports: props.viewports,
      cacheValid: props.cacheValid,
      update: 'init',
      region: props.region ? props.region : 'ww',
      rollbar: new Rollbar({
        accessToken: process.env.ROLLBAR_TOKEN,
        captureUncaught: true,
        captureUnhandledRejections: true,
      })
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

  regionTrigger = (e: React.MouseEvent): void => {
    const value = e.currentTarget.attributes.getNamedItem('value')

    if (value) {
      const tmpValue = value.value as Client.RegionCode
      this.setState({ region: tmpValue })
      io.send(REGION_UPDATE, tmpValue)
    }
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

      await new Promise((resolve): any => setTimeout(resolve, 500))

      this.setState({ update: 'updating' })

      await new Promise((resolve): any => setTimeout(resolve, 1500))

      const newViewportsResponse = await downloadViewports()

      this.setState({ update: 'done' })

      await new Promise((resolve): any => setTimeout(resolve, 1000))

      if (newViewportsResponse.status === 200) {
        this.setState({
          cacheValid: true,
          update: 'finished',
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
    

    console.log(`[Viewports] Current app state:`)
    console.log(this.state)
  }

  // ************************************************ //
  // Main render method
  // ************************************************ //

  public render(): React.ReactNode {
    // this.state.rollbar.info('react test log')

    return (
      <Main>
        <GlobalStyles />

        <RegionSelect
          trigger={this.regionTrigger}
          region={this.state.region}
        />

        <p>Hello world!</p>

        <UpdateBanner update={this.state.update} />
      </Main>
    )
  }
}