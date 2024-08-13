const { Resource, Link } = require('hal')

const HAL_JSON = 'application/hal+json; charset=utf-8'

const links = {
  root: '/',
  health: '/health',
}

const root = ({ res }) => {
  const response = new Resource({}, links.root)
  response.link(new Link('health', links.health))
  res
    .header('content-type', HAL_JSON)
    .json(response)
}

const health = ({ res }) => {
  const response = new Resource({ ok: true }, links.health)
  response.link(new Link('root', links.root))
  res
    .header('content-type', HAL_JSON)
    .json(response)
}

module.exports = {
  root,
  health,
}
