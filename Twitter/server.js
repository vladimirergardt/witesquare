const express = require('express')
const proxy = require('http-proxy-middleware')
const path = require('path')

const app = express()

app.use('/api', proxy({
  target: 'https://api.twitter.com/1.1',
  changeOrigin: true,
  pathRewrite: {
    '^/api': ''
  }
}))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'twitter.html'))
})

app.listen(3000, function() {
  console.log('App listening at http://::%s', 3000)
})

