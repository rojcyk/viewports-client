import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../../constants/tokens'
import { DisplayPreview } from './displayPreview'
import { OSBadge } from './osBadge'

const DisplayWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding-right: 8px;
  transition: all 200ms ease-out;
`

const DisplayStyle = styled.li<{
  width: number,
  height: number
}>`
  cursor: pointer;
  user-select: none;
  display: block;
  padding: 4px 8px;

  &:hover {
    div${DisplayWrapper} {
      background-color: rgba(24, 160, 251, 0.06);
      transition: all 200ms ease-out;
    }
  }
`

const Dimensions = styled.span`
  font-size: 15px;
  color: ${colors.ink.primary};
  flex: 1 1 auto;
`

const MarketShare = styled.span`
  flex: 0 0 auto;
  font-size: 14px;
  padding: 6px 6px;
  border-radius: 20px;
  color: rgba(24, 160, 251, 1);
  background-color: rgba(24, 160, 251, 0.06);
`

export const mobileOs = (width: number, height: number): number => {
  const dimensions = width + 'x' + height

  switch (dimensions) {
    case '320x568':
    case '375x667':
    case '375x812':
    case '414x736':
    case '414x896':
      return 1
    default:
      return 2
  }
}

export const Viewport = (props: {
  width: number
  height: number
  key: number
  trigger: any
  platform: Client.PlatformCode
  share: string
}) => {
  const os = props.platform === 'mobile' ? mobileOs(props.width, props.height) : 0

  return (
    <DisplayStyle
      width={props.width}
      height={props.height}
      onClick={props.trigger}>

      <DisplayWrapper>
        <DisplayPreview
          height={props.height}
          width={props.width}
          platform={props.platform} />

        <Dimensions>
          {props.width}x{props.height}
        </Dimensions>

        {props.platform === 'mobile' && (<OSBadge os={os} />)}

        <MarketShare>{props.share}%</MarketShare>
      </DisplayWrapper>
    </DisplayStyle>
  )
}