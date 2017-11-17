const _ = require('lodash')
const joi = require('joi')
const boom = require('boom')
const utils = require('../utils')
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
    config: {
      validate: {
        params: joi.object({
          id: joi.number()
        })
      }
    },
    handler: (request, reply) => {
      const productId = parseInt(request.params.id)
      console.log('GET /product/'+productId)
      const product = _.find(data.products, {'id': productId})
      if (product) reply(product)
      else reply(boom.notFound('Product '+productId+' not found'))
    }
  },

  {
    method: 'GET',
    path: '/product/filter/{filterId}',
    config: {
      validate: {
        params: joi.object({
          filterId: joi.number()
        })
      }
    },
    handler: (request, reply) => {
      const filterId = parseInt(request.params.filterId)
      console.log('GET /product/filter/'+filterId)
      const products = data.products.filter(product =>
                          product.filters.find(value => {
                            if(value===filterId) return true
                            }
                          )
                        )
      if (products && products.length) reply(products)
      else reply(boom.notFound('Not exist Producs for the filterId'+filterId))
    }
  },

  {
    method: 'GET',
    path: '/product/category/{categoryId}/filter/{filterId}',
    config: {
      validate: {
        params: joi.object({
          categoryId: joi.number(),
          filterId: joi.number()
        })
      }
    },
    handler: (request, reply) => {
      const categoryId = parseInt(request.params.categoryId)
      const filterId = parseInt(request.params.filterId)
      console.log('GET /product/category/'+categoryId+'/filter/'+filterId)
      const productsCat = data.products.filter(product =>
                            product.categoryId === categoryId
                          )
      const productsCatFilter = productsCat.filter(product =>
                          product.filters.find(value => {
                            if(value===filterId) return true
                            }
                          )
                        )
      if (productsCatFilter && productsCatFilter.length) reply(productsCatFilter)
      else reply(boom.notFound(
        'Not exist Producs for the filterId '+filterId+' and categoryId '+categoryId
      ))
    }
  },
  {
    method: 'POST',
    path: '/product',
    config: {
      validate: {
        payload: joi.object({
          id: joi.number().required(),
          categoryId: joi.number().required(),
          name: joi.string().required(),
          description: joi.string().required(),
          image: joi.string().allow(''),
          stock: joi.number().required(),
          price: joi.number().required(),
          offer: joi.number().allow(null),
          filters: joi.array().allow([])
        })
      }
    },
    handler: (request, reply) => {
      console.log('POST /product/')
      data.products.push(request.payload)
      utils.writeFile('../data/products.json', data.products)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/product/{id}',
    config: {
      validate: {
        params: joi.object({
          id: joi.number()
        }),
        payload: joi.object({
          id: joi.number().required(),
          categoryId: joi.number().required(),
          name: joi.string().required(),
          description: joi.string().required(),
          image: joi.string().allow(''),
          stock: joi.number().required(),
          price: joi.number().required(),
          offer: joi.number().allow(null),
          filters: joi.array().allow([])
        })
      }
    },
    handler: (request, reply) => {
      const productId = parseInt(request.params.id)
      console.log('PUT /products/'+productId)
      const index = _.findIndex(data.products, {'id': productId})
      if (index >= 0) {
        data.products[index] = request.payload
        utils.writeFile('../data/products.json', data.products)
        reply(data.products[index])
      }
      else reply(boom.notFound('Product '+productId+' not found'))
    }
  },

  {
    method: 'DELETE',
    path: '/product/{id}',
    config: {
      validate: {
        params: joi.object({
          id: joi.number()
        })
      }
    },
    handler: (request, reply) => {
      const productId = parseInt(request.params.id)
      console.log('DELETE /products/'+productId)
      const index = _.findIndex(data.products, {'id': productId})
      if (index >= 0) {
        data.products.splice(index, 1)
        utils.writeFile('../data/products.json', data.products)
        reply({deleted: true})
      }
      else reply(boom.notFound('Product '+productId+' not deleted'))
    }
  }
]

module.exports = routes
