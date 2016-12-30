# NPR Dailygraphic Yeoman Generator

This is an _experimental, work in progress_ Yeoman generator for creating NPR-styled d3 graphics.

To try it out, first install the dependencies:

```
npm install -g yo gh
brew install gdrive
```

This uses:

- Yeoman, obviously
- [node-gh](https://github.com/node-gh/gh) for automatic Github repo creation
- [gdrive](https://github.com/prasmussen/gdrive) for automatic Google Sheet creation

Then, clone the repo and link it so Yeoman can use it.

```
git clone https://github.com/nprapps/generator-dailygraphic.git
cd generator-dailygraphic
npm link
```

Linking will not be necessary once this generator is published to npm, but we're not there yet.

## Using the generator

To use the generator, run `yo dailygraphic`.

You'll be presented with a few questions.

First, name the graphic (this is poorly named, this is really a slug, so it should be like `my-graphic-name` not `My Graphic Name`).

Then, choose your chart template. **Important: only line chart works right now!**.

Then, you can optionally create a Github repo and a Google Drive spreadsheet.

This process will create a folder with an initialized git repo with your new graphic in the folder where you ran `yo dailygraphic` from.

## Using the generated graphic

Inside the graphic folder, you can run the Express/Webpack server for local development by running `npm start`.

To update your spreadsheet from Google Drive, run `npm run text`.

To deploy, run `npm run deploy_stage`.