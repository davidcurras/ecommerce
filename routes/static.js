const path = require('path')

const routes = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.join(__dirname, '../public')
      }
    }
  }
]

module.exports = routes
