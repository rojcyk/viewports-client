import * as React from 'react'
import styled from 'styled-components'

const height = 32
const transitionSpeed = '0.6s'

export interface UpdateProps {
  update: string
}

const UpdateWrapper = styled.div`
  width: 100%;
  height: ${height}px;
  padding-left: 8px;
  padding-right: 8px;
  position: fixed;
  left: 0;
  z-index: 100;
  transition: all;
  transition-duration: ${transitionSpeed};
  transition-timing-function: cubic-bezier(0.33, 1, 0.68, 1);

  bottom: ${(props: UpdateProps): string => {
    switch (props.update) {
      case 'updating':
      case 'done':
        return `8px`
      case 'init':
      case 'finished':
      default:
        return `-${height}px`
    }
  }};
`

const UpdateBannerStyle = styled.div`
  font-size: 13px;
  width: 100%;
  color: white;
  font-weight: 600;
  padding: 8px;
  z-index: 100;
  transition: all;
  transition-duration: ${transitionSpeed};
  border-radius: 3px;

  background-color: ${(props: UpdateProps): string => {
    switch (props.update) {
      case 'init':
        return '#0FB4E8'
      case 'updating':
        return '#27D7AD'
      case 'finished':
      case 'done':
      default:
        return '#34C63A'
    }
  }};
`

export const UpdateBanner = (props: UpdateProps): JSX.Element => {
  let copy

  switch (props.update) {
    case 'init':
      copy = 'Update available!'
      break
    case 'updating':
      copy = 'Updating ...'
      break
    case 'finished':
    case 'done':
    case 'error':
      copy = 'Updated!'
      break
  }

  return (
    <UpdateWrapper update={props.update}>
      <UpdateBannerStyle update={props.update}>{copy}</UpdateBannerStyle>
    </UpdateWrapper>
  )
}
