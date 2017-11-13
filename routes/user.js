const _ = require('lodash')
const joi = require('joi')
const boom = require('boom')
const utils = require('../utils')
const data = require('../data')

const routes = [
  {
    method: 'GET',
    path: '/user',
    handler: (request, reply) => {
      console.log('GET /user')
      reply(data.users)
    }
  },
  {
    method: 'GET',
    path: '/user/{id}',
    config: {
      validate: {
        params: joi.object({
          id: joi.number()
        })
      }
    },
    handler: (request, reply) => {
      const userId = parseInt(request.params.id)
      console.log('GET /user/'+userId)
      const user = _.find(data.users, {'id': userId})
      if (user) reply(user)
      else reply(boom.notFound('User '+userId+' not found'))
    }
  },
  {
    method: 'GET',
    path: '/user/{key}/{value}',
    config: {
      validate: {
        params: joi.object({
          key: joi.string(),
          value: joi.string(),
        })
      }
    },
    handler: (request, reply) => {
      const key = request.params.key
      const value = request.params.value
      console.log('GET /user/' + key + '/' + value);
      const filter = {}
      filter[key] = value
      const users = _.filter(data.users, filter)
      if (users && users.length) reply(users)
      else reply(boom.notFound('No matches'))
    }
  },
  {
    method: 'POST',
    path: '/user',
    config: {
      validate: {
        payload: joi.object({
          id: joi.number().required(),
          username: joi.string().required(),
          pass: joi.string().required(),
          email: joi.string().required(),
          name: joi.string().required(),
          lastName: joi.string().required(),
          address: joi.string().required(),
          phone: joi.string().allow(''),
          isAdmin: joi.boolean()
        })
      }
    },
    handler: (request, reply) => {
      console.log('POST /user/')
      data.users.push(request.payload)
      utils.writeFile('../data/users.json', data.users)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    config: {
      validate: {
        params: joi.object({
          id: joi.number()
        }),
        payload: joi.object({
          id: joi.number().required(),
          username: joi.string().required(),
          pass: joi.string().required(),
          email: joi.string().required(),
          name: joi.string().required(),
          lastName: joi.string().required(),
          address: joi.string().required(),
          phone: joi.string().allow(''),
          isAdmin: joi.boolean()
        })
      },
    },
    handler: (request, reply) => {
      const userId = parseInt(request.params.id)
      console.log('PUT /users/'+userId)
      const index = _.findIndex(data.users, {'id': userId})
      if (index >= 0) {
        data.users[index] = request.payload
        utils.writeFile('../data/users.json', data.users)
        reply(data.users[index])
      }
      else reply(boom.notFound('User '+userId+' not found'))
    }
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    config: {
      validate: {
        params: joi.object({
          id: joi.number()
        })
      }
    },
    handler: (request, reply) => {
      const userId = parseInt(request.params.id)
      console.log('DELETE /users/'+userId)
      const index = _.findIndex(data.users, {'id': userId})
      if (index >= 0) {
        data.users.splice(index, 1)
        utils.writeFile('../data/users.json', data.users)
        reply({deleted: true})
      }
      else reply(boom.notFound('User '+userId+' not found'))
    }
  }
]

module.exports = routes
