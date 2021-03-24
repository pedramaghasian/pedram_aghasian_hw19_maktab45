const database = require('./database')
const session = require('./session')
const layout = require('./layout')
const service = require('./service')
module.exports = {
  database,
  port: process.env.APPLICATION_PORT,
  session,
  layout,
  service

}