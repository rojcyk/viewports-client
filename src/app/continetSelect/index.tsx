import * as React from 'react'

import { Section, SectionProps } from '../section'
import { ContinentToogle } from './continentToggle'
import { ContinentSelection } from './continentSelection'
import { colors } from '../../constants/tokens'

export const continentName = (continent: Client.RegionCode): string => {
  switch (continent) {
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

interface ContinentsProps extends SectionProps {
  continent: Client.RegionCode
}

export default class Continents extends Section<ContinentsProps> {
  public background(): string {
    return colors.bg.secondary
  }

  public renderToggle(): React.ReactNode {
    return (
      <ContinentToogle
        expanded={this.state.expanded}
        selection={this.props.continent}
        customAction={this.toogleExpand}
      />
    )
  }

  public renderContent(): React.ReactNode {
    return (
      <ContinentSelection
        selectedContinent={this.props.continent}
        expanded={this.state.expanded}
        trigger={this.selectionPress}
      />
    )
  }
}
