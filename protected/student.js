// NEED WORK
const express = require('express')
const path = require('path')
const router = express.Router()

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    const date = new Date()
    console.log(`Time: ${date.toString()}`)
    next()
})
// define the home page route
router.get('/', (req, res) => {
    //console.log(`get students`, req.user);
    res.render('students', { user: req.user });
})
router.get('/class/:id', (req, res) => {
    const studentId = req.params.id
    //look up classes taken by this student
    const classes = 'Need implementation'
    res.send(`Welcome! Student id = ${studentId} ${classes}`)
})

// define the classes route
router.get('/registration', (req, res) => {
    let file = path.join(__dirname,'data','studentRegistration.csv')
    console.log(file);
    res.sendFile(file)
})

// define the classes route
router.get('/tuition', (req, res) => {
    res.send('Tuition')
})

module.exports = router