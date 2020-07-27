import * as React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div<{ show: boolean }>`
  z-index: 100;
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);
  overflow: auto;

  ${(props: any): string => {
    if (props.show) return `
      padding-top: 0px;
      opacity: 1;
    
    `; else return `
      padding-top: 16px;
      opacity: 0;
      pointer-events: none;
    `
  }}
`

const Background = styled.div`
  z-index: 105;
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left:0;
  background-color: rgba(0,0,0,0.1);
`

const ContentPadding = styled.div`
  z-index: 110;
  position: relative;
  padding: 12px;
`

const ContentWrapper = styled.div<{ show: boolean }>`
  border-radius: 8px;
  background-color: white;
  border: 1px solid #CFCFCF;
  transition: all 0.2s cubic-bezier(0.33, 1, 0.68, 1);

  ${(props: any): string => {
    if (props.show) return `
      margin-top: 0;
      transform: scale(1);
    `; else return `
      margin-top: 16px;
      transform: scale(0.9);
    `
  }}
`

export const Modal = (props: {
  show: boolean
  children: any
  close: any
}) => {
  return (
    <div>
      <Wrapper show={props.show}>
        <Background onClick={props.close} />
        <ContentPadding>
          <ContentWrapper show={props.show}>
            {props.children}
          </ContentWrapper>
        </ContentPadding>
      </Wrapper>
    </div>
  )
}
