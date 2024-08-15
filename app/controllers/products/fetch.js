const { Resource } = require('hal')
const links = require('../links.util')
const { HAL_JSON, UUID_REGEX } = require('../constants.util')

const fetch = async ({ app, req: { params }, res }) => {
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
