# gatsby-plugin-amplitude

Gatsby plugin for Amplitude.

## Install

```sh
yarn add gatsby-plugin-amplitude
```

## Usage

```sh
// In your gatsby-config.js
plugins: [
  {
    resolve: 'gatsby-plugin-amplitude',
    options: {
      apiKey: 'YOUR-API-KEY',
      enableOnDevMode: true // if 'false', will be fired on NODE_ENV=production only
    },
  },
],
```
