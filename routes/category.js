const _ = require('lodash')
const data = require('../data')

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
    handler: (request, reply) => {
      const key = request.params.key
      var value
      if (!parseInt(request.params.value)) {
        value = request.params.value
      } else {
        value = parseInt(request.params.value)
      }
      console.log('GET /category/'+key + '/' +value);
      const filter = {}
      filter[key] = value
      const categories = _.filter(data.categories, filter)
      if (categories && categories.length) reply(categories)
      else reply({error: 'not found'})
    }
  },
  {
    method: 'POST',
    path: '/category',
    handler: (request, reply) => {
      console.log('POST /category/')
      data.categories.push(request.payload)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/category/{id}',
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
