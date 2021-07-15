import * as React from 'react'
import io from 'figmaio/ui'

import { Section } from '../section'
import { PlatformToggle } from './platformToggle'
import { Viewport } from '../viewport/index'
import { DISPLAY_UPDATE } from '../../constants/events'
import { Header } from '../header'

interface PlatformProps {
  platform: any
  data?: Client.Viewport[]
  expanded?: boolean
}

const displayTrigger = async (e: React.MouseEvent): Promise<void> => {
  const width = e.currentTarget.getAttribute('width')
  const height = e.currentTarget.getAttribute('height')

  io.send(DISPLAY_UPDATE, {
    width: width ? parseInt(width) : null,
    height: height ? parseInt(height) : null
  })
}

export class Platform extends Section<PlatformProps> {
  public renderToggle(): React.ReactNode {
    return (
      <Header
       isExpanded={this.state.expanded}
       isActive={true}
       label={this.props.platform}
       toggle={this.toogleExpand}
      />
      // <PlatformToggle
      //   label={this.props.platform}
      //   expanded={this.state.expanded}
      //   customAction={this.toogleExpand}
      //   platform={this.props.platform}
      // />
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
          trigger={displayTrigger}
          key={i}
          platform={this.props.platform}
        />
      )
    })

    return (
      <div>{list}</div>
    )
  }
}
