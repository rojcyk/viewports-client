<p align="center">
  <img src="./cover.png">
  <br>
  <br>
  <br>
    <a href="https://david-dm.org/rojcyk/viewports-client?type=dev">
       <img src="https://david-dm.org/rojcyk/viewports-client/dev-status.svg">
    </a> 
    <img src="https://img.shields.io/endpoint?url=https://yuanqing.github.io/figma-plugins-stats/plugin/732240841094697441/installs.json">

</p>

# Viewports client

**Viewports is a [Figma](https://figma.com/) plugin**

_Make sure that your designs are covering a reasonable share of the market. Select one or more frames and Viewports will let you change their sizes to your preferred display. Simple!_

[Viewports](https://www.figma.com/community/plugin/732240841094697441/Viewports) is a rather simple React App which dynamicaly displays a list popular viewports on the market (together with its market share). It is downlading the data from [viewports-server](https://github.com/rojcyk/viewports-server).


## Requirements

- It is a [React App](https://reactjs.org/).
- It is written in [Typescript](https://www.typescriptlang.org/).
- It uses [Webpack](https://webpack.js.org/) for bundling.

_You should know at least a little bit about these before proceeding._

# Installation

Is quite simple and there is not much to it.

1. Clone the repo
2. Create a [manifest.json file](https://www.figma.com/plugin-docs/manifest/) and add it to the repo _(.gitignore it though)_
3. Install the requirements with `npm install` or `yarn install`
4. Watch the files with `yarn dev` command
5. Or make a production build with `yarn build`
6. [Load and develop](https://www.figma.com/plugin-docs/setup/) the app in [Figma Desktop app](https://www.figma.com/downloads/)
