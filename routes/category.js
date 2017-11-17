const _ = require('lodash')
const data = require('../data')
const boom = require('boom')
const joi = require('joi')

const routes = [
  {
    method: 'GET',
    path: '/category',
    handler: (request, reply) => {
      console.log('GET /category')
      reply(data.categories)
    }
  },
  {
    method: 'GET',
    path: '/category/{id}',
    config: {
      validate: {
        params: joi.object().required({
          id: joi.number().required()
        })
      }
    },
    handler: (request, reply) => {
      const categoryId = parseInt(request.params.id)
      console.log('GET /category/'+categoryId)
      const category = _.find(data.categories, {'id': categoryId})
      if (category) reply(category)
      else reply({error: 'not found'})
    }
  },
  {
    method: 'GET',
    path: '/category/{key}/{value}',
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
      console.log('GET /category/'+key + '/' +value);
      const categories = _.filter(data.categories, (categories) => {
        console.log(categories);
        console.log(value);
        console.log(key);
        return categories[key].toString() === value.toString()
      })
      if (categories && categories.length) reply(categories)
      else reply(boom.notFound('No matches'))
    }
  },
  {
    method: 'POST',
    path: '/category',
    config: {
      validate: {
        payload: joi.object().required({
          "id": joi.number().required(),
          "name": joi.string().required(),
          "parentId": joi.number().required()
        })
      }
    },
    handler: (request, reply) => {
      console.log('POST /category/')
      data.categories.push(request.payload)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/category/{id}',
    config: {
      validate: {
        payload: joi.object().required({
          "id": joi.number().required(),
          "name": joi.string().required(),
          "parentId": joi.number().required()
        })
      }
    },
    handler: (request, reply) => {
      const categoryId = parseInt(request.params.id)
      console.log('PUT /categories/'+categoryId)
      const index = _.findIndex(data.categories, {'id': categoryId})
      if (index >= 0) {
        data.categories[index] = request.payload
        reply(data.categories[index])
      }
      else reply({error: 'not found'})
    }
  },
  {
    method: 'DELETE',
    path: '/category/{id}',
    config: {
      validate: {
        params: joi.object().required({
          id: joi.number().required()
        })
      }
    },
    handler: (request, reply) => {
      const categoryId = parseInt(request.params.id)
      console.log('DELETE /categories/'+categoryId)
      const index = _.findIndex(data.categories, {'id': categoryId})
      if (index >= 0) {
        data.categories.splice(index, 1)
        reply({deleted: true})
      }
      else reply({error: 'not found'})
    }
  }
]

module.exports = routes
