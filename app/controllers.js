const { Resource, Link } = require('hal')

const links = {
  root: '/',
  health: '/health',
}

const root = ({ res }) => {
  const response = new Resource({}, links.root)
  response.link(new Link('health', links.health))
  res.json(response)
}

const health = ({ res }) => {
  const response = new Resource({ ok: true }, links.health)
  response.link(new Link('root', links.root))
  res.json(response)
}

module.exports = {
  root,
  health,
}
