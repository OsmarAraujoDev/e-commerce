const express = require('express')
const { engine } = require('express-handlebars')
const session = require('express-session')
const authsRoutes = require('./routes/authsRoutes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './src/views')

app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'hello, world!' })
})

app.use('/auths', authsRoutes)

app.get((err, req, res, next) => {
  return res.sendStatus(500)
})

module.exports = app