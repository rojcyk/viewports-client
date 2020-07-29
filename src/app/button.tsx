import * as React from 'react'
import styled, { css } from 'styled-components'
import { colors } from '../constants/tokens'

const ButtonStyle = css`
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease-out;
  cursor: pointer;
  border: none;

  width: 100%;
  padding-top: 12px;
  padding-bottom: 12px;

  font-size: 16px;
  font-weight: 600;
  text-align: center;
  outline: none;
`

const ButtonCTAStyle = styled.button`
  ${ButtonStyle}

  color: ${colors.bg.primary};
  background-color: ${colors.cta.normal};

  &:hover {
    background-color: ${colors.cta.normalHover};
  }
`

const ButtonSecondaryStyle = styled.button`
  ${ButtonStyle}

  color: ${colors.ink.primary};
  background-color: ${colors.bg.tertiary};

  &:hover {
    background-color: ${colors.bg.tertiaryHover};
  }
`

interface IButton {
  onClick: any,
  children: any
}


export const ButtonCTA = ({ onClick, children }: IButton) => (<ButtonCTAStyle onClick={onClick}>{children}</ButtonCTAStyle>)
export const ButtonSecondary = ({ onClick, children }: IButton) => (<ButtonSecondaryStyle onClick={onClick}>{children}</ButtonSecondaryStyle>)
