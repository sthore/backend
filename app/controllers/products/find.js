const { Resource } = require('hal')
const links = require('../links.util')
const { HAL_JSON } = require('../constants.util')

const find = async ({ app, res }) => {
  const toResource = (item) =>
    new Resource(item.toJSON(), links.products.item(item.id))
  const products = await app.get('db').model('products').findAll()
  const response = new Resource({}, links.products.find)
  response.embed('products', products.map(toResource))
  response.link('root', links.root)
  res.header('content-type', HAL_JSON).json(response)
}

module.exports = find
