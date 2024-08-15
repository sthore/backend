const { newDb } = require('pg-mem')

const mem = newDb()

module.exports = {
    app: {
      database: {
        dialect: 'postgres',
        dialectModule: mem.adapters.createPg(),
        timezone: 'America/Sao_Paulo',
        define: {
          timestamps: true,
          paranoid: true,
        },
        benchmark: true,
        sync: {
          force: true,
        },
      },
    },
  }
  