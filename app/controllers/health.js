const { Resource } = require('hal')
const links = require('./links.util')

const HAL_JSON = 'application/hal+json; charset=utf-8'

const health = ({ res }) => {
  const response = new Resource({ ok: true }, links.health)
  response.link('root', links.root)
  res.header('content-type', HAL_JSON).json(response)
}

module.exports = health
