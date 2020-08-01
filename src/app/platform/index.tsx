import * as React from 'react'

import { Section } from '../section'
import { PlatformToggle } from './platformToggle'
import { Viewport } from '../viewport/index'

interface PlatformProps {
  trigger: Function
  displayTrigger: Function
  platform: any
  data?: Client.Viewport[]
  expanded?: boolean
}

export class Platform extends Section<PlatformProps> {
  public renderToggle(): React.ReactNode {
    return (
      <PlatformToggle
        label={this.props.platform}
        expanded={this.state.expanded}
        customAction={this.toogleExpand}
        trigger={this.props.trigger}
        platform={this.props.platform}
      />
    )
  }

  public renderContent(): React.ReactNode {
    if (this.props.data === undefined) return null
    const list = this.props.data.map((viewport: Client.Viewport, i: number) => {
      return (
        <Viewport 
          share={viewport.share}
          width={viewport.display.width}
          height={viewport.display.height}
          trigger={this.props.displayTrigger}
          key={i}
          osVisible={true}
        />
      )
    })

    return (
      <div>{list}</div>
    )
  }
}
