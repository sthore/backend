const pureHttp = require('pure-http');

const app = pureHttp();

app.use((req, res, next) => {
  req.res = res;
  next();
});

app.get('/health', ({ res }) =>  res.json({ ok: true }));

module.exports = app;
