const express = require('express')
const path = require('path')
const connectDatabase = require('./config/database')
const cors = require('cors')

const app = express()

const http = require('http').Server(app)
const io = require('socket.io')(http)

const Routes = require('./config/routes')

app.use((req, res, next) => {
    req.io = io
    next()
})
app.use(cors())
app.use('/static', express.static(path.resolve(__dirname, '..', 'static')))
app.use(Routes)

connectDatabase(function() {
    http.listen(3333, () => {
        console.log('Server is running in port 3000')
    })
})
