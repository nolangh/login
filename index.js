// NEED WORK
const express = require('express');
const app = express();
const path = require('path');
const passport = require('passport')
const Strategy = require('passport-local').Strategy;
const login = require('connect-ensure-login');
const bcrypt = require('bcryptjs');
const db = require('./db');
const student = require('./protected/student');
const port = process.env.PORT || 3000; //PORT=5050 node app

// view template config
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// express app (web server) config
// app.use(express.json)
app.use(express.urlencoded({extended:false}))
app.use(require('express-session')({
    secret: 'MTec-backend',
    resave: false,
    saveUninitialized: false
}))
app.use('/static', express.static('public'))

// passport setup
passport.use(new Strategy( (username, password, cb) => {
    db.users.findByUsername(username, (err, user) => {
        //handle all the fail cases before return the valid user
        if(err) {return cb(err)}
        // if no user found or password doesn't match 
        // return cb(null, false)}
        // otherwise return cb(null, user)
    })
}))

passport.serializeUser( (user, cb)=>{
    cb(null, user.id)
})

passport.deserializeUser( (id, cb)=>{
    db.users.findById(id, (err, user)=>{
        if(err) {return cb(err)}
        cb(null, user)
    })
})

app.use(passport.initialize())
app.use(passport.session())

// basic routes
app.get('/', (req, res)=>{
    res.render('index', { user: req.user, title: 'passport local'})
})

app.get('/login', (req, res)=>{
    res.render('login', {title:'login page'})
})

app.get('/signup', (req, res)=>{
    res.render('signup', {title:'new user sign up'})
})

app.post('/signup', (req, res)=>{
    let username = req.body.username
    let password = req.body.password
    //save new user
    res.render('error',{message:`TODO: Add this ${username} ${password} to the app`, error:[]})
})

// passport login and logout
app.post('/login',
    passport.authenticate('local', {failureRedirect:'/login'}),
    (req, res)=>{
        res.redirect('/student') // or login success page
    }
)
app.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/')
})
// passport handle protected routes
app.use('/students?',
    login.ensureLoggedIn(),
    student)

app.listen(port, ()=>{
    //const salt = bcrypt.genSaltSync(12)
    // let encryptedPassword = bcrypt.hashSync('jack$123', salt)
    // console.log(`--${encryptedPassword}--`);
    console.log(`port :${port}`);
})