declare namespace Client {

  type RegionCode = 'ww' | 'af' | 'as' | 'eu' | 'oc' | 'na' | 'sa'
  type PlatformCode = 'mobile' | 'tablet' | 'desktop'
  type LoadingState = 'init' | 'updating' | 'done' | 'error'

  type Viewport = {
    share: string
    display: {
      width: number
      height: number
    }
  }

  type PlatformData = {
    [K in RegionCode]: Viewport[]
  }

  type ViewportsData = {
    [K in PlatformCode]: PlatformData
  }

  type InitData = {
    cacheValid: boolean
    viewports: ViewportsData
  }

  type AppState = {
    viewports: ViewportsData,
    cacheValid: boolean,
    update: LoadingState
  }
}
