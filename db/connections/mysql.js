import path from 'path'
import winston from 'winston'
import Connection from 'sequelize-connect'

const env = process.env
const matcher = (modelFileName) => true

if (process.env.NODE_ENV !== 'production') {
  winston.level = 'debug'
}

async function connect() {
  return await new Connection(env.MYSQL_DATABASE, env.MYSQL_USER, env.MYSQL_PASSWORD, {
    host: env.MYSQL_HOST,
    dialect: 'mysql',
    port: env.MYSQL_PORT,
    force: false
  }, [path.join(__dirname, env.MYSQL_DIR_MODELS)], matcher, winston)
}

export default async function() {
  try {
    return await connect()
  } catch (e) {
    console.log(e)
  }
}
