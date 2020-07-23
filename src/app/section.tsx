import * as React from 'react'
import AnimateHeight from 'react-animate-height'
import styled from 'styled-components'

import { colors, animationSpeed } from '../constants/tokens'

// ******************************** //
// Interface
// ******************************** //

export interface SectionProps {
  trigger: Function
  expanded?: boolean
}

interface SectionState {
  expanded: boolean
  height: number | string,
  toggle?: any,
  content?: any
  bg?: string
}

// ******************************** //
// Styles
// ******************************** //

const Wrapper = styled.div<{
  expanded: boolean
}>`
  transition: padding-top 0.3s ease-out, padding-bottom 0.3s ease-out;
  background-color: ${colors.bg.tertiary};
  padding-top: ${props => (props.expanded ? '3px' : '0')};
  padding-bottom: ${props => (props.expanded ? '4px' : '1px')};
`

const InnerWrapper = styled.div<{
  bg: string
}>`
  background-color: ${props => props.bg};
`

// ******************************** //
// Section Class
// ******************************** //

export class Section<T extends SectionProps> extends React.Component<T, SectionState> {
  public constructor(props: T) {
    super(props)
    this.state = {
      expanded: props.expanded ? props.expanded : false,
      height: 0,
    }
  }

  public selectionPress = (e: React.MouseEvent): void => {
    this.toogleExpand()
    this.props.trigger(e)
  }

  public toogleExpand = (): void => {
    if (this.state.expanded === false) {
      this.setState({
        expanded: true,
        height: 'auto',
      })
    } else {
      this.setState({
        expanded: false,
        height: 0,
      })
    }
  }


  public background(): string {
    return 'white'
  }

  public renderToggle(): React.ReactNode {
    return <React.Fragment></React.Fragment>
  }

  public renderContent(): React.ReactNode {
    return <React.Fragment></React.Fragment>
  }

  public render(): React.ReactNode {
    return (
      <Wrapper expanded={this.state.expanded}>
        <InnerWrapper bg={this.background()}>
          {this.renderToggle()}
          <AnimateHeight duration={animationSpeed} height={this.state.height}>
            {this.renderContent()}
          </AnimateHeight>
        </InnerWrapper>
      </Wrapper>
    )
  }
}