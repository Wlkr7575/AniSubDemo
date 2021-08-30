const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userRoutes = require('./Auth/routes/user')
const productRoutes = require('./Auth/routes/product')
const connectDb = require('./Auth/connect')
const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

connectDb()

app.use('/user', userRoutes)
app.use('/post', productRoutes)

module.exports = { path: '/api', handler: app }
