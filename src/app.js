const express = require('express')
const { engine } = require('express-handlebars')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'hello, world!' })
})

module.exports = app