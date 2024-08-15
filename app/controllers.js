const { Resource, Link } = require('hal')

const HAL_JSON = 'application/hal+json; charset=utf-8'

const links = {
  root: '/',
  health: '/health',
  products: {
    find: '/api/v1/products',
    item: (id) => `/api/v1/products/${id}`,
  },
}

const root = ({ res }) => {
  const response = new Resource({}, links.root)
  response.link(new Link('health', links.health))
  res.header('content-type', HAL_JSON).json(response)
}

const health = ({ res }) => {
  const response = new Resource({ ok: true }, links.health)
  response.link(new Link('root', links.root))
  res.header('content-type', HAL_JSON).json(response)
}

const products = {
  find: async ({ req, res }) => {
    const toResource = (item) =>
      new Resource(item.toJSON(), links.products.item(item.id))
    const products = await req.app.get('db').model('products').findAll()
    const response = new Resource({}, links.products.find)
    response.embed('products', products.map(toResource))
    response.link('root', links.root)
    res.header('content-type', HAL_JSON).json(response)
  },
}

module.exports = {
  root,
  health,
  products,
}
