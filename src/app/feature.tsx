import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../constants/tokens'

const Wrapper = styled.div`
  padding: 16px 14px;
  border-top: 1px solid ${colors.bg.tertiary};
  display: flex;

  &:last-of-type {
    border-top: 1px solid ${colors.bg.tertiary};
  }
`

const Copy = styled.div`
  padding-left: 12px;
  width: 100%;
`

const Title = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 16px;
  color: ${colors.ink.primary};
  margin-bottom: 4px;
`

const ImageWrapper = styled.div`
  width: 36px;
  flex-grow: 0;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`


export const Feature = ({
  title,
  children,
  image
}: {
  title: string,
  children: any,
  image: any
}) => {
  const Image = image
  return (
    <Wrapper>
      <ImageWrapper>
        <Image />
      </ImageWrapper>

      <Copy>
        <Title>{title}</Title>
        {children}
      </Copy>
    </Wrapper>
  )
}
