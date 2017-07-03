const express = require('express');
const path = require('path');

const app = express();

// Server routes...
app.get('/hello', (req, res) => res.send({ hi: 'there' }));

if (process.env.NODE_ENV !== 'production') {
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config.js');
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  // make everything 'dist' directory freely available for everyone
  app.use(express.static('dist'));

  // this line takes care of React Router issue
  // if anyone goes to any route in our application, serve them index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


app.listen(process.env.PORT || 3050, () => console.log('Listening'));
