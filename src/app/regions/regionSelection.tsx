import * as React from 'react'
import styled from 'styled-components'

import { regionName } from './index'
import { colors } from '../../constants/tokens'

/////////////////////
// Category Selection
/////////////////////

export const continentsList: Client.RegionCode[] = [
  'ww',
  'af',
  'as',
  'eu',
  'oc',
  'na',
  'sa',
]

const toggleOpacity = (props: { expanded: boolean }): string =>
  props.expanded ? '1' : '0'

const togglePosition = (props: { expanded: boolean }): string =>
  props.expanded ? '0' : '-30'

const toggleVisibility = (props: { expanded: boolean }): string =>
  props.expanded ? 'visible' : 'hidden'

const RegionSelectionStyle = styled.ul<{
  expanded: boolean
}>`
  transition: all 300ms ease-out;
  position: relative;
  overflow: hidden;

  margin: 0;
  padding: 0;

  padding-left: 18px;
  padding-right: 12px;
  padding-bottom: 12px;

  opacity: ${() => toggleOpacity};
  top: ${() => togglePosition};
  visibility: ${() => toggleVisibility};
`
const RegionSelectionItemStyle = styled.li<{
  active: boolean
}>`
  color: ${props => (props.active ? colors.cta : colors.ink.primary)};
  list-style-type: none;
  padding-left: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    color: ${colors.cta};
    background-color: rgba(24, 160, 251, 0.06);
  }
`

export const RegionSelection = (props: {
  expanded: boolean
  trigger: any
  selectedRegion: Client.RegionCode
}) => {
  const listItems = continentsList.map(
    (region: Client.RegionCode, i: number) => {
      let active = false

      if (props.selectedRegion === region) active = true

      return (
        <RegionSelectionItemStyle
          key={i}
          value={region}
          onClick={props.trigger}
          active={active}
        >
          {regionName(region)}
        </RegionSelectionItemStyle>
      )
    },
  )

  return (
    <RegionSelectionStyle expanded={props.expanded}>
      {listItems}
    </RegionSelectionStyle>
  )
}
