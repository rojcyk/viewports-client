import * as React from 'react'
import styled from 'styled-components'

import { colors } from '../../constants/tokens'
import { selectOS } from '../../helpers/selectOS'
import { DisplayPreview } from './displayPreview'
import { OSBadge } from './osBadge'

const DisplayStyle = styled.li<{
  width: number
  height: number
}>`
  cursor: pointer;
  display: flex;
  align-items: center;
  user-select: none;

  padding: 2px 12px;

  &:hover {
    background-color: rgba(24, 160, 251, 0.06);
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

export const Viewport = (props: {
  width: number
  height: number
  index: number
  trigger: any
  osVisible: boolean
}) => {
  const os = selectOS(props.width, props.height)

  return (
    <DisplayStyle
      key={props.index}
      width={props.width}
      height={props.height}
      onClick={props.trigger}
    >
      <DisplayPreview height={props.height} width={props.width} os={os} />
      <Dimensions>
        {props.width}x{props.height}
      </Dimensions>

      {props.osVisible && (<OSBadge os={os} />)}

      <MarketShare>1%</MarketShare>
    </DisplayStyle>
  )
}