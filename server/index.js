const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'session',
    store: new FileStore(),
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
    },
    resave: false,
    saveUninitialized: false,
}));

require('./config-passport');;
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
        if (err) 
        {
            return next(err);
        }
        if (!user)
        {
            return res.send('user not found');
        }
        req.logIn(user, (err) => {
            if (err)
            {
                return next(err);
            }
            return res.redirect('/game');
        })
    })(req, res, next);
});

const auth = (req, res, next) => {
    if (req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/');
}

app.get('/game', auth, (req, res) => {
    res.send('this is game page');
});

app.listen(3000, () => console.log('server is running on port 3000'));