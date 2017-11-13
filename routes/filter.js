const _ = require('lodash')
const data = require('../data')

const routes = [{
    method: 'GET',
    path: '/filter',
    handler: (request, reply) => {
      console.log('GET /filter')
      reply(data.filters)
    }
  },
  {
    method: 'GET',
    path: '/filter/{id}',
    handler: (request, reply) => {
      const filterId = parseInt(request.params.id)
      console.log('GET /filter/' + filterId)
      const filter = _.find(data.filters, {
        'id': filterId
      })
      if (filter) reply(filter)
      else reply({
        error: 'not found'
      })
    }
  },
  {
    method: 'GET',
    path: '/filter/{key}/{value}',
    handler: (request, reply) => {
      const key = request.params.key
      const value = request.params.value
      console.log('GET /filter/' + key + '/' + value);
      const filter = {}
      filter[key] = value
      const filters = _.filter(data.filters, filter)
      if (filters && filters.length) reply(filters)
      else reply({
        error: 'not found'
      })
    }
  },
  {
    method: 'POST',
    path: '/filter',
    handler: (request, reply) => {
      console.log('POST /filter/')
      data.filters.push(request.payload)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/filter/{id}',
    handler: (request, reply) => {
      const filterId = parseInt(request.params.id)
      console.log('PUT /filters/' + filterId)
      const index = _.findIndex(data.filters, {
        'id': filterId
      })
      if (index >= 0) {
        data.filters[index] = request.payload
        reply(data.filters[index])
      } else reply({
        error: 'not found'
      })
    }
  },
  {
    method: 'DELETE',
    path: '/filter/{id}',
    handler: (request, reply) => {
      const filterId = parseInt(request.params.id)
      console.log('DELETE /filters/' + filterId)
      const index = _.findIndex(data.filters, {
        'id': filterId
      })
      if (index >= 0) {
        data.filters.splice(index, 1)
        reply({
          deleted: true
        })
      } else reply({
        error: 'not found'
      })
    }
  }
]

module.exports = routes
