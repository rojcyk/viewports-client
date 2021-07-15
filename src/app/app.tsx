import * as React from 'react'
import dayjs from 'dayjs'
import io from 'figmaio/ui'
import styled from 'styled-components'
import axios from 'axios'

import { DATA_UPDATE, REGION_UPDATE } from '../constants/events'
import { VIEWPORTS_URL } from '../constants/server'
import { GlobalStyles } from './globalStyles'
import { UpdateBanner } from './updateBanner'
import { Regions } from './regions/index'
import { Platform } from './platform/index'

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
      region: props.region ? props.region : 'ww'
    }
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

      const newViewportsResponse = await axios.get(`${VIEWPORTS_URL}/viewports`)

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
    let platformData, tabletData, desktopData: Client.Viewport[] = []

    if (this.state.viewports) {
      platformData = this.state.viewports['mobile'][this.state.region]
      tabletData = this.state.viewports['tablet'][this.state.region]
      desktopData = this.state.viewports['desktop'][this.state.region]
    }    

    return (
      <Main>
        <GlobalStyles />

        <Regions
          trigger={this.regionTrigger}
          region={this.state.region}
        />

        <Platform
          platform={'mobile'}
          data={platformData}
        />

        <Platform
          platform={'tablet'}
          data={tabletData}
        />

        <Platform
          platform={'desktop'}
          data={desktopData}
        />

        <UpdateBanner update={this.state.update} />

      </Main>
    )
  }
}