const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()
const app = express()

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
// parse application/json
app.use(express.json())

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoute'))
app.use(errorHandler)
app.listen (port,()=> console.log(`Server started on port ${port}`))
