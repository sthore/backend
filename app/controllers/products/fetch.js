const { Resource } = require('hal')
const links = require('./../links.util')

const HAL_JSON = 'application/hal+json; charset=utf-8'

const fetch = async ({ app, req: { params }, res }) => {
  const UUID_REGEX =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!UUID_REGEX.test(params.id)) {
    res.status(404).json({})
    return
  }
  const product = await app.get('db').model('products').findByPk(params.id)
  if (!product) {
    res.status(404).json({})
    return
  }
  const response = new Resource(
    product.toJSON(),
    links.products.item(product.id),
  )
  response.link('products', links.products.find)
  res.header('content-type', HAL_JSON).json(response)
}

module.exports = fetch
