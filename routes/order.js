const _ = require('lodash')
const joi = require('joi')
const boom = require('boom')
const utils = require('../utils')
const data = require('../data')

const routes = [
  {
    method: 'GET',
    path: '/order',
    handler: (request, reply) => {
      console.log('GET /order')
      reply(data.orders)
    }
  },
  {
    method: 'GET',
    path: '/order/{id}',
    config: {
      validate: {
        params: joi.object().required({
          id: joi.number().required()
        })
      }
    },
    handler: (request, reply) => {
      const orderId = parseInt(request.params.id)
      console.log('GET /order/'+orderId)
      const order = _.find(data.orders, {'id': orderId})
      if (order) reply(order)
      else reply(boom.notFound('Order '+orderId+' not found'))
    }
  },
  {
    method: 'GET',
    path: '/order/{key}/{value}',
    config: {
      validate: {
        params: joi.object().required({
          key: joi.string().required(),
          value: joi.string().required(),
        })
      }
    },
    handler: (request, reply) => {
      const key = request.params.key
      const value = request.params.value
<<<<<<< HEAD
      console.log('GET /order/' + key + '/' + value);
      const filter = {}
      filter[key] = value
      const orders = _.filter(data.orders, (orders) => {
        return orders[key].toString() === value.toString()
=======
      console.log('GET /order/' + key + '/' + value)
      const orders = _.filter(data.orders, (order) => {
        return order[key].toString() === value.toString()
>>>>>>> ecommerce#8: order api
      })
      if (orders && orders.length) reply(orders)
      else reply(boom.notFound('No matches'))
    }
  },
  {
    method: 'POST',
    path: '/order',
    config: {
      validate: {
<<<<<<< HEAD
        payload: joi.object().required({
          "id": joi.number().required(),
          "userId": joi.number().required(),
          "date": joi.string().required(),
          "products": joi.array().min(1).items(joi.object().required({
            "id": joi.number().required()
            })
          )
=======
        payload: joi.object({
          id: joi.number().required(),
          userId: joi.number().required(),
          date: joi.string().required(),
          products: joi.array().items(
            joi.object({
              productsId: joi.number()
            })
          ).required()
>>>>>>> ecommerce#8: order api
        })
      }
    },
    handler: (request, reply) => {
      console.log('POST /order/')
      data.orders.push(request.payload)
      utils.writeFile('../data/orders.json', data.orders)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/order/{id}',
    config: {
      validate: {
<<<<<<< HEAD
        payload: joi.object().required({
          "id": joi.number().required(),
          "userId": joi.number().required(),
          "date": joi.string().required(),
          "products": joi.array().min(1).items(joi.object().required({
            "id": joi.number().required()
            })
          )
        })
      }
=======
        params: joi.object({
          id: joi.number()
        }),
        payload: joi.object({
          id: joi.number().required(),
          userId: joi.number().required(),
          date: joi.string().required(),
          products: joi.array().items(
            joi.object({
              productsId: joi.number()
            })
          ).required()
        }),
      },
>>>>>>> ecommerce#8: order api
    },
    handler: (request, reply) => {
      const orderId = parseInt(request.params.id)
      console.log('PUT /orders/'+orderId)
      const index = _.findIndex(data.orders, {'id': orderId})
      if (index >= 0) {
        data.orders[index] = request.payload
        utils.writeFile('../data/orders.json', data.orders)
        reply(data.orders[index])
      }
<<<<<<< HEAD
      else reply(boom.notFound('Order '+orderId+' not found'))
=======
      else reply(boom.notFound('order '+orderId+' not found'))
>>>>>>> ecommerce#8: order api
    }
  },
  {
    method: 'DELETE',
    path: '/order/{id}',
    config: {
      validate: {
<<<<<<< HEAD
        params: joi.object().required({
          id: joi.number().required()
=======
        params: joi.object({
          id: joi.number()
>>>>>>> ecommerce#8: order api
        })
      }
    },
    handler: (request, reply) => {
      const orderId = parseInt(request.params.id)
      console.log('DELETE /orders/'+orderId)
      const index = _.findIndex(data.orders, {'id': orderId})
      if (index >= 0) {
        data.orders.splice(index, 1)
        utils.writeFile('../data/orders.json', data.orders)
        reply({deleted: true})
      }
<<<<<<< HEAD
      else reply(boom.notFound('Order '+orderId+' not found'))
=======
      else reply(boom.notFound('User '+orderId+' not found'))
>>>>>>> ecommerce#8: order api
    }
  }
]

module.exports = routes
