const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const db = require('./queries')
const { body, validationResult } = require('express-validator')



app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(express.json());

app.get('/',(request,response) => {
    response.json({info: 'User Hobbies'})
})

app.get('/users',db.getUsers)
app.get('/users/:id' ,db.getUserById)
app.post('/users',
    body('name','enter valid name').isLength({min :1}),db.createUser)
app.put('/users/:id',
    body('name','enter valid name').isLength({min :1}),db.updateUser)
app.delete('/users/:id', db.deleteUser)


app.get('/hobbies',db.getH)
app.get('/hobbies/:id',db.getHById)
app.post('/hobbies',
body('id').isNumeric(),
body('year').isDate(),
body('name').isLength({min:1}),
body('level').isLength({min:1}),db.createH)
app.delete('/hobbies/:id',db.deleteH)
app.put('/hobbies/:id',
body('id').isNumeric(),
body('year').isDate(),
body('name').isLength({min:1}),
body('level').isLength({min:1}),db.updateH)

app.listen(port,()=>{
    console.log(`app running on port http://localhost:${port}`);
})