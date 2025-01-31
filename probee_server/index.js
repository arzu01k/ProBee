const express = require('express')
var cors = require('cors')
const db = require('./helpers/database')
const res = require('express/lib/response')
const projectsRoutes = require('./helpers/projectsRoutes.js')
const usersRoutes = require('./helpers/usersRoutes.js')
const app = express()
const port = 8000

app.use(express.json());
app.use(cors())
db()

app.get('/', (req, res)=> {
    res.send('')
})

app.listen(port, ()=>{
    console.log('Listening on port %d', port);
})

app.use('/projects', projectsRoutes)
app.use('/users', usersRoutes)