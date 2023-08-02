const mongoose = require('mongoose')
const dbConfig = require('../../config/db.config')

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.users = require('./users.model')

module.exports = db