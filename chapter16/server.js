require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');

const filePayloadExist = require('./middleware/filePayloadExist');
const fileSizeLimiter = require('./middleware/fileSizeLimiter');
const fileExtLimiter = require('./middleware/fileExtLimiter');

const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post(
	'/upload',
	fileUpload({
		createParentPath: true,
	}),
	filePayloadExist,
	fileExtLimiter(['.png', '.jpg', '.jpeg']),
	fileSizeLimiter,
	(req, res) => {
		const files = req.files;
		console.log(files);

		return res.json({
			status: 'Success',
			message: `${Object.keys(files).toString()}`,
		});
	}
);

mongoose.connection.once('open', () => {
	console.log('Successfully connected to db');
	app.listen(PORT, console.log(`Server running on port ${PORT}`));
});
