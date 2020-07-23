import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../../constants/tokens'
import { Arrow } from '../icons/arrow'

interface PlatformToggleProps {
  label: string
  expanded: boolean
  customAction: any
  trigger: Function
  platform: any
}

const PlatformToggleStyle = styled.div<{
  expanded: boolean
  value: any
}>`
  fill: ${props =>
    props.expanded ? colors.cta : colors.ink.primary} !important;
  color: ${props =>
    props.expanded ? colors.cta : colors.ink.primary} !important;

  cursor: pointer;
  width: 100%;
  font-size: 16px;

  padding-left: 12px;
  padding-right: 12px;
  padding-top: ${props => (props.expanded ? '24px' : '16px')};
  padding-bottom: ${props => (props.expanded ? '24px' : '16px')};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  outline: none;
  font-weight: 500;
  transition: all 0.3s ease-out;
  text-transform: capitalize;
`

export class PlatformToggle extends React.Component<PlatformToggleProps, {}> {
  customClick = (e: React.MouseEvent): void => {
    this.props.trigger(e)
    this.props.customAction()
  }

  public render(): React.ReactNode {
    return (
      <PlatformToggleStyle
        expanded={this.props.expanded}
        onClick={this.customClick.bind(this)}
        value={this.props.platform}
      >
        <Arrow expanded={this.props.expanded} />
        {this.props.label}
      </PlatformToggleStyle>
    )
  }
}
