import * as React from 'react'
import styled from 'styled-components'

import Icon from './imgs/icon.png'
import { Modal } from './modal'
import { Feature } from './feature'
import { colors } from '../constants/tokens'

import { Star } from './icons/star'
import { Github } from './icons/github'
import { Heart } from './icons/heart'
import { Money } from './icons/money'

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
  font-size: 18px;
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

export const GoproBanner = ({
  hideFnc,
  shown
}: {
  hideFnc: any,
  shown: boolean
}): JSX.Element => {
  return (
    <Modal close={hideFnc} show={shown}>
      <ImageWrapper src={Icon} />
      <Title>Viewports  Friends</Title>
      <Description>
        Running Viewports cost money, but the product itself is free.
        <br />
        <br />
        And I don't want to change that! But if you would like to help to keep the lights on, and maybe expand on the features.
        <br />
        <br />
        You might consider donating!
      </Description>

      <Feature image={Star} title={'Remove the banner'}>
        <Subtitle>
          You don't like it? It is gone!
        </Subtitle>
      </Feature>

      <Feature image={Heart} title={'Support the development'}>
        <Subtitle>
          I would like to add more features, and build libraries that the whole Figma plugin community can benefit from.
        </Subtitle>
      </Feature>

      <Feature image={Money} title={'Help cover the server cost'}>
        <Subtitle>
          There are weekly web scrappers, and a server that is providing the data to tens of thousands of plugin installations.
        </Subtitle>
      </Feature>

      <Feature image={Github} title={'Viewports is open source'}>
        <Subtitle>
          If you don't want to support this project it is fine! You can even <a href="https://github.com/rojcyk/viewports-client" target="_blank">download the source code</a> and build it yourself.
        </Subtitle>
      </Feature>
    </Modal>
  )
}
