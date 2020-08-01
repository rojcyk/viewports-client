import * as React from 'react'
import styled from 'styled-components'

import Icon from '../imgs/icon.png'
import { Modal } from '../modal'
import { Feature } from '../feature'
import { colors } from '../../constants/tokens'

import { Star } from '../icons/star'
import { Github } from '../icons/github'
import { Heart } from '../icons/heart'
import { ButtonCTA, ButtonSecondary } from '../button'

const ImageWrapper = styled.img`
  display: block;
  width: 42px;
  height: 42px;
  margin: 0 auto;
  border-radius: 21px;
  margin-bottom: 16px;
  margin-top: 24px;
`

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  padding: 0;
  margin: 0;
  margin-bottom: 22px;
  text-align: center;
  color: ${colors.ink.primary};
`

const Description = styled.p`
  margin: 0;
  margin-bottom: 16px;
  padding: 16px;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.ink.secondary};
`

const Subtitle = styled.p`
  margin: 0;
  padding: 0;
  font-size: 13px;
  line-height: 18px;
  color: ${colors.ink.secondary};

  a {
    color: ${colors.ink.primary};
  }
`

const Separator = styled.hr`
  margin: 0;
  padding: 0;
  height: 1px;
  border: none;
  background-color: ${colors.bg.tertiary};
`

const ButtonGroup = styled.div`
  margin: 0;
  padding: 16px;
  display: flex;
  flex-direction: column;
  

  & > *:not(:last-of-type) {
    margin-bottom: 16px;
  }
`

const openGithub = () => {
  window.open("https://github.com/sponsors/rojcyk")
}

export const SupportModal = ({
  hideFnc,
  shown
}: {
  hideFnc: any,
  shown: boolean
}): JSX.Element => {

  if (shown) {
    console.log('[Viewports] Modal hidden')
    document.body.style.overflow = "hidden"
  } else {
    console.log('[Viewports] Modal shown')
    document.body.style.overflow = "visible"
  }

  return (
    <Modal close={hideFnc} show={shown}>
      <ImageWrapper src={Icon} />
      <Title>Support Viewports</Title>
      <Description>
        If you enjoy using Viewports, or you find value in what it provides, you migh consider donating 👊
        <br />
        <br />
        It would be extremly valuable for me. It would help me to improve this one, and build other free plugins.
      </Description>

      {/* So far github doesn't have an easy way to check whether somebody is supporting or not. */}

      {/* <Feature image={Star} title={'Remove the banner'}>
        <Subtitle>
          You don't like it? It is gone!
        </Subtitle>
      </Feature> */}

      <Feature image={Star} title={'Help cover the server cost'}>
        <Subtitle>
          There are weekly web scrappers, and a server that is providing the data to tens of thousands of plugin installations.
        </Subtitle>
      </Feature>

      <Feature image={Heart} title={'Support the development'}>
        <Subtitle>
          I would like to add more features, and build libraries that the whole Figma plugin community can benefit from.
        </Subtitle>
      </Feature>

      <Feature image={Github} title={'Viewports is open source'}>
        <Subtitle>
          If you would like to see how the plugin is built or would like to play with it yourself, you can <a href="https://github.com/rojcyk/viewports-client" target="_blank">download the source code</a>!
        </Subtitle>
      </Feature>

      <Separator />

      <ButtonGroup>
        <ButtonCTA onClick={openGithub}>Support</ButtonCTA>
        <ButtonSecondary onClick={hideFnc}>Close</ButtonSecondary>
      </ButtonGroup>
    </Modal>
  )
}
