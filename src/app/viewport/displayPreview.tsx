import * as React from 'react'
import styled from 'styled-components'
import { colors } from '../../constants/tokens'

const bounds = 44
const maxSize = 26

interface DisplayStyle {
  width: number
  height: number
}

const PreviewWrapper = styled.div`
  display: inline-flex;

  width: ${bounds}px;
  height: ${bounds}px;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`

const Display = styled.div<{
  width: number
  height: number
  type: number
}>`
  position: relative;
  border: 1px solid ${colors.cta.normal};
  background-color: #e8f5ff;
  border-radius: 3px;
  width: ${(props): string => props.width.toString()}px;
  height: ${(props): string => props.height.toString()}px;

  ${props => {
    switch (props.type) {
      case 1:
        return `
          &:after {
            background-color: ${colors.cta.normal};
            position: absolute;
            text-align: center;
            content: ' ';
            height: 3px;
            width: 100%;
          }

          &:before {
            font-size: 10px;
            background-color: ${colors.cta.normal};
            position: absolute;
            text-align: center;
            line-height: 4px;
            bottom: 0;
            color: ${colors.bg.primary};
            content: '•';
            height: 3px;
            width: 100%;
          }`
      case 2:
        return `
          &:after {
            background-color: ${colors.cta.normal};
            position: absolute;
            text-align: center;
            content: ' ';
            height: 2px;
            width: 8px;
            border-bottom-right-radius: 2px;
            border-bottom-left-radius: 2px;
            left: 50%;
            margin-left: -4px;
          }
        `
    }
  }}
`

const calculateSize = (widthRatio: number, heightRatio: number): DisplayStyle => {

  let relativeHeight: number
  let relativeWidth: number

  if (heightRatio > widthRatio) {
    relativeHeight = maxSize

    const tmp = relativeHeight / heightRatio
    relativeWidth = tmp * widthRatio
  } else {
    relativeWidth = maxSize
    const tmp = relativeWidth / widthRatio
    relativeHeight = tmp * heightRatio
  }

  const offSet = 2

  return {
    width: parseInt(relativeWidth.toFixed(0)) + offSet,
    height: parseInt(relativeHeight.toFixed(0)) + offSet,
  }
}

export const DisplayPreview = (props: { width: number, height: number, os: number }) => {
  const { width, height } = calculateSize(props.width, props.height)

  return (
    <PreviewWrapper>
      <Display
        type={props.os}
        width={width}
        height={height}
      />
    </PreviewWrapper>
  )
}
