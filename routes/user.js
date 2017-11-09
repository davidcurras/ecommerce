const _ = require('lodash')
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
    handler: (request, reply) => {
      const userId = parseInt(request.params.id)
      console.log('GET /user/'+userId)
      const user = _.find(data.users, {'id': userId})
      if (user) reply(user)
      else reply({error: 'not found'})
    }
  },
  {
    method: 'POST',
    path: '/user',
    handler: (request, reply) => {
      console.log('POST /user/')
      data.users.push(request.payload)
      reply(request.payload)
    }
  },
  {
    method: 'PUT',
    path: '/user/{id}',
    handler: (request, reply) => {
      const userId = parseInt(request.params.id)
      console.log('PUT /users/'+userId)
      const index = _.findIndex(data.users, {'id': userId})
      if (index >= 0) {
        data.users[index] = request.payload
        reply(data.users[index])
      }
      else reply({error: 'not found'})
    }
  },
  {
    method: 'DELETE',
    path: '/user/{id}',
    handler: (request, reply) => {
      const userId = parseInt(request.params.id)
      console.log('DELETE /users/'+userId)
      const index = _.findIndex(data.users, {'id': userId})
      if (index >= 0) {
        data.users.splice(index, 1)
        reply({deleted: true})
      }
      else reply({error: 'not found'})
    }
  }
]

module.exports = routes
