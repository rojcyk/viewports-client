import * as React from 'react'
import styled from 'styled-components'

import { Apple } from '../icons/apple'
import { Android } from '../icons/android'

const AppleWrapper = styled.span`
  flex: 0 0 auto;
  font-size: 14px;
  padding: 6px;
  border-radius: 20px;
  color: rgba(24, 160, 251, 1);
  background-color: rgba(0, 0, 0, 0.04);
  margin-right: 4px;
`

const AndroidWrapper = styled.span`
  flex: 0 0 auto;
  font-size: 14px;
  padding: 6px;
  border-radius: 20px;
  fill: #a6ce39;
  color: #a6ce39;
  background-color: #f6faeb;
  fill: #30d780;
  background-color: #e8fef2;
  margin-right: 4px;
`

export const OSBadge = (props: { os: number }) => {
  switch (props.os){
    case 1:
      return <AppleWrapper><Apple /></AppleWrapper>
    case 2:
      return <AndroidWrapper><Android /></AndroidWrapper>
    default:
      return <React.Fragment />
  }
}