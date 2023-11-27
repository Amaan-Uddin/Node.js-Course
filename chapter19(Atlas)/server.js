require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const connectDB = require('./config/dbCon');
const User = require('./model/User');

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
	try {
		const result = await User.create({
			name: req.body.name,
		});
		res.json({ data: result });
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

mongoose.connection.once('open', () => {
	console.log(`Connected to database ${mongoose.connection.name}`);
	app.listen(3000, () => {
		console.log('Listning on port 3000');
	});
});
