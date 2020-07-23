import * as React from 'react'

import { Section, SectionProps } from '../section'
import { RegionToogle } from './regionToggle'
import { RegionSelection } from './regionSelection'
import { colors } from '../../constants/tokens'

export const regionName = (region: Client.RegionCode): string => {
  switch (region) {
    case 'ww':
      return 'World wide'
    case 'af':
      return 'Africa'
    case 'as':
      return 'Asia'
    case 'eu':
      return 'Europe'
    case 'oc':
      return 'Oceania'
    case 'na':
      return 'North America'
    case 'sa':
      return 'South America'
  }
}

interface RegionsProps extends SectionProps {
  region: Client.RegionCode
}

export class Regions extends Section<RegionsProps> {
  public background(): string {
    return colors.bg.secondary
  }

  public renderToggle(): React.ReactNode {
    return (
      <RegionToogle
        expanded={this.state.expanded}
        selection={this.props.region}
        customAction={this.toogleExpand}
      />
    )
  }

  public renderContent(): React.ReactNode {
    return (
      <RegionSelection
        selectedRegion={this.props.region}
        expanded={this.state.expanded}
        trigger={this.selectionPress}
      />
    )
  }
}
