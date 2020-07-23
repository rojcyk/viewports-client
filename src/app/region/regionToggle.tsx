import * as React from 'react'
import styled from 'styled-components'

import { regionName } from './index'
import { Arrow } from '../icons/arrow'
import { colors, animationSpeed } from '../../constants/tokens'

////////////////////////////
// Continent Dropdown Buttson
////////////////////////////

const RegionToogleStyle = styled.div<{
  expanded: boolean
}>`
  color: ${colors.ink.secondary};
  fill: ${colors.ink.secondary};

  cursor: pointer;
  width: 100%;

  padding-left: 12px;
  padding-right: 12px;
  padding-top: ${props => (props.expanded ? '14px' : '8px')};
  padding-bottom: ${props => (props.expanded ? '14px' : '8px')};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  outline: none;
  font-weight: 500;
  transition: all ${animationSpeed}ms ease-out;

  // &:hover {
  //   background-color: ${colors.bg.tertiary};
  // }
`

export const RegionToogle = (props: {
  expanded: boolean
  selection: Client.RegionCode
  customAction: any
}) => {
  let label: string

  if (props.expanded) {
    label = 'Pick location ...'
  } else {
    label = regionName(props.selection)
  }

  return (
    <RegionToogleStyle
      expanded={props.expanded}
      onClick={props.customAction}
    >
      <Arrow expanded={props.expanded} />
      {label}
    </RegionToogleStyle>
  )
}
