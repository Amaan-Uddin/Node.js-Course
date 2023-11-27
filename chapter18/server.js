require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');

require('./auth');

// check for logged in user, check if the request object has a user
function isLoggedIn(req, res, next) {
	console.log(req.user);
	req.user ? next() : res.sendStatus(401);
}

const app = express();

app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

const port = 5000;

app.get('/', (req, res) => {
	res.send('<a href="/auth/google">Get Google Authenticated</a>');
});

app.get(
	'/auth/google',
	// authenticate the user and aquire their email and profile
	passport.authenticate('google', {
		scope: ['email', 'profile'],
	})
);
app.get(
	'/auth/google/callback',
	// determine what happens after the verify callback
	passport.authenticate('google', {
		successRedirect: '/protected',
		failureRedirect: '/',
	})
);

app.get('/protected', isLoggedIn, (req, res) => {
	res.send(`hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
	req.session.destroy();
	res.send('goodbye');
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
