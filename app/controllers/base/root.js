const { Resource } = require('hal')
const links = require('../links.util')
const { HAL_JSON } = require('../constants.util')

const root = ({ res }) => {
  const response = new Resource({}, links.root)
  response.link('health', links.health)
  response.link('products', links.products.find)
  res.header('content-type', HAL_JSON).json(response)
}

module.exports = root
