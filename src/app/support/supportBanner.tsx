import * as React from 'react'
import styled from 'styled-components'

import { Star } from '../icons/star'

const Wrapper = styled.div`
  width: 50%;
  user-select: none;
  background-color: #FFF8DF;
  padding: 6px 8px;
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
  padding-left: 8px;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 13px;
  color: #7B3400;
  font-weight: 400;
`


export const GoPro = ({
  onClick
}: {
  onClick: any
}) => {
  return (
    <Wrapper onClick={onClick}>
      <Star size={12} />
      <Copy>
        <Title>Support <b>→</b></Title>
      </Copy>
    </Wrapper>
  )
}
