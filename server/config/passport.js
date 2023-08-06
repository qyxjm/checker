const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./db');

passport.serializeUser((user, done) => {
    console.log('serialize user ', user);
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('deserialize user ', id);
    const user = await db.query(`SELECT * FROM userdata WHERE id = $1`, [id]);
    if (user.rowCount === 0)
    {
        return done(null, false);
    }
    return done(null, user.rows[0]);
});

passport.use(new LocalStrategy(async (username, password, done) => {
    console.log('local strategy')
    const user = await db.query(`SELECT * FROM userdata WHERE username = $1 AND password = $2`,
        [username, password]);
    if (user.rowCount === 0)
    {
        console.log('user not found')
        return done(null, false);
    }
    return done(null, user.rows[0]);
}));