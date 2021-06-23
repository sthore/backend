const pureHttp = require('pure-http');

const app = pureHttp();

app.use((req, res, next) => {
  req.res = res;
  next();
});

app.get('/health', ({ res }) =>  res.json({ ok: true }));

const port = parseInt(process.env.PORT || '3000');

app.listen(port, () => console.log(`Listen server on port ${port}`))

