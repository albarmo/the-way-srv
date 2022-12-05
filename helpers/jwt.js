const jwt = require('jsonwebtoken')

const generateAccessToken = (payload) => {
  return (accessToken = jwt.sign(payload, 'SUPERSECRETALBARKEY', {
    expiresIn: '365d',
  }))
}

const verifyToken = (accessToken) => {
  return jwt.verify(accessToken, 'SUPERSECRETALBARKEY')
}

module.exports = {
  generateAccessToken,
  verifyToken,
}
