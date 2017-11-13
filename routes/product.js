const _ = require('lodash')
const data = require('../data')

const routes = [
  {
    method: 'GET',
    path: '/product',
    handler: (request, reply) => {
      console.log('GET /product')
      reply(data.products)
    }
  },
  {
    method: 'GET',
    path: '/product/{id}',
    handler: (request, reply) => {
      const productId = parseInt(request.params.id)
      console.log('GET /product/'+productId)
      const product = _.find(data.products, {'id': productId})
      if (product) reply(product)
      else reply({error: 'not found'})
    }
  },
  {
    method: 'POST',
    path: '/product',
    handler: (request, reply) => {
      console.log('POST /product/')
      data.products.push(request.payload)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/product/{id}',
    handler: (request, reply) => {
      const productId = parseInt(request.params.id)
      console.log('PUT /products/'+productId)
      const index = _.findIndex(data.products, {'id': productId})
      if (index >= 0) {
        data.products[index] = request.payload
        reply(data.products[index])
      }
      else reply({error: 'not found'})
    }
  },
  {
    method: 'DELETE',
    path: '/product/{id}',
    handler: (request, reply) => {
      const productId = parseInt(request.params.id)
      console.log('DELETE /products/'+productId)
      const index = _.findIndex(data.products, {'id': productId})
      if (index >= 0) {
        data.products.splice(index, 1)
        reply({deleted: true})
      }
      else reply({error: 'not found'})
    }
  }
]

module.exports = routes
