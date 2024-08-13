const Sequelize = require('sequelize')

const setup = async (options) => {
  const sequelize = new Sequelize(options)

  sequelize.define('products', {
    sku: Sequelize.DataTypes.STRING,
  })

  return sequelize
}

module.exports = setup
