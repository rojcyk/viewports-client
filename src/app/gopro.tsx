import * as React from 'react'
import styled from 'styled-components'

import { Star } from './icons/star'

const Wrapper = styled.div`
  user-select: none;
  background-color: #FFF8DF;
  padding: 14px;
  border-bottom: 1px solid #F3E6D6;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease-out;
  cursor: pointer;

  &:hover {
    background-color: #FFF1D6;
  }
`

const Copy = styled.div`
  padding-left: 12px;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: #7B3400;
  margin-bottom: 4px;
`

const Description = styled.p`
  margin: 0;
  padding: 0;
  font-size: 12px;
  color: #8E5022;
  line-height: 16px;
`


export const GoPro = ({
  onClick
}: {
  onClick: any
}) => {
  return (
    <Wrapper onClick={onClick}>
        <Star/>

      <Copy>
        <Title>Viewports Family →</Title>
        <Description>Help cover server cost and future develpment!</Description>
      </Copy>
    </Wrapper>
  )
}
