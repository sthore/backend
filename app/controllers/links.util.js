const links = {
  root: '/',
  health: '/health',
  products: {
    find: '/api/v1/products',
    item: (id) => `/api/v1/products/${id}`,
  },
}

module.exports = links
