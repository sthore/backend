const root = ({ res }) => res.json({})

const health = ({ res }) => res.json({ ok: true })

module.exports = {
  root,
  health,
}
