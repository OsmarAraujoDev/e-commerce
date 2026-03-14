require('dotenv').config()

const app = require('./src/app')
const db = require('./src/config/database')
const { User } = require('./src/models');

const PORT = process.env.PORT || 3000

const startDatabase = async () => {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
    await db.sync()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

startDatabase();

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`)
})