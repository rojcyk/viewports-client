import * as React from 'react'
import styled from 'styled-components'

import { Slack } from '../icons/slack'

const Wrapper = styled.div`
  width: 50%;
  user-select: none;
  background-color: #FFF8DF;
  padding: 6px 8px;
  border-bottom: 1px solid #F3E6D6;
  border-left: 1px solid #F3E6D6;
  display: flex;
  align-items: center;
  transition: all 0.3s ease-out;
  cursor: pointer;

  b {
    transition: margin-left 0.18s ease-out;
  }

  &:hover {
    background-color: #FFF1D6;

    b {
      margin-left: 6px;
    }
  }
`

const Copy = styled.div`
  padding-left: 8px;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #7B3400;
  font-weight: 400;
`

const BetaBadge = styled.span`
  display: inline-block;
  margin: 0;
  margin-left: 4px;
  padding: 0;
  font-size: 9px;
  padding: 2px 4px;
  text-style: uppercase;
  letter-spacing: 1px;
  color: #7B3400;
  font-weight: 400;
  border: 1px solid #7B3400;
  border-radius: 3px;
  font-weight: 600;
`


export const GoSlack = ({
  onClick
}: {
  onClick: any
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Slack size={24} />
      <Copy>
        <Title>Slack <BetaBadge>BETA</BetaBadge></Title>
      </Copy>
    </Wrapper>
  )
}
