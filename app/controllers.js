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
  response.link('health', links.health)
  response.link('products', links.products.find)
  res.header('content-type', HAL_JSON).json(response)
}

const health = ({ res }) => {
  const response = new Resource({ ok: true }, links.health)
  response.link(new Link('root', links.root))
  res.header('content-type', HAL_JSON).json(response)
}

const products = {
  find: async ({ app, res }) => {
    const toResource = (item) =>
      new Resource(item.toJSON(), links.products.item(item.id))
    const products = await app.get('db').model('products').findAll()
    const response = new Resource({}, links.products.find)
    response.embed('products', products.map(toResource))
    response.link('root', links.root)
    res.header('content-type', HAL_JSON).json(response)
  },
  fetch: async ({ app, req: { params }, res }) => {
    const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    if (!UUID_REGEX.test(params.id)) {
      res.status(404).json({})
      return
    }
    const product = await app.get('db').model('products').findByPk(params.id)
    if (!product) {
      res.status(404).json({})
      return
    }
    const response = new Resource(product.toJSON(), links.products.item(product.id))
    response.link('products', links.products.find)
    res.header('content-type', HAL_JSON).json(response)
  },
}

module.exports = {
  root,
  health,
  products,
}
