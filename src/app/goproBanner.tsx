import * as React from 'react'
import styled from 'styled-components'

import { Star } from './icons/star'

const Wrapper = styled.div`
  user-select: none;
  background-color: #FFF8DF;
  padding-left: 14px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #F3E6D6;
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
  padding-left: 12px;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 14px;
  color: #7B3400;
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
      <Star size={16} />
      <Copy>
        <Title>Support Viewports <b>→</b></Title>
      </Copy>
    </Wrapper>
  )
}
