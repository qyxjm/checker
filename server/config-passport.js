const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userDB = {
    id: 1,
    username: 'white',
    password: 'white',
}

passport.serializeUser((user, done) => {
    console.log('serialize user', user);
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('deserialize user', id);
    const user = (userDB.id === id) ? userDB : false;
    return done(null, user);
});

passport.use(new LocalStrategy((username, password, done) => {
    if (username === userDB.username && password === userDB.password)
    {
        return done(null, userDB);
    }
    return done(null, false);
}));