const Sequelize = require('sequelize')

const setup = async (options) => {
  const sequelize = new Sequelize(options)

  sequelize.define('products', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    sku: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    description: Sequelize.DataTypes.TEXT,
  })

  return sequelize
}

module.exports = setup
