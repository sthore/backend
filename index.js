const app = require('./app')

const port = Number.parseInt(process.env.PORT || '3000')

app.listen(port, () => console.log(`Listen server on port ${port}`))
