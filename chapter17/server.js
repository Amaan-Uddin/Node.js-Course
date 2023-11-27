const express = require('express');
const ejs = require('ejs');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// set storage engine
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 },
	fileFilter: function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single('myImage');

function checkFileType(file, cb) {
	// allowed ext i.e. RegEx
	const filetypes = /jpeg|jpeg|png/;
	// check ext
	const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
	// check mime type
	const mimetype = filetypes.test(file.mimetype);

	if (extname && mimetype) {
		return cb(null, true);
	} else {
		return cb('Error: Images only');
	}
}

// set ejs engine
app.set('view engine', 'ejs');

// use static folder i.e public
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/upload', (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.render('index', { msg: err });
		} else {
			if (req.file == undefined) {
				res.render('index', {
					msg: 'Error: No file selected',
				});
			} else {
				console.log(req.file);
				res.render('index', {
					msg: 'File uploaded',
					fileImg: `uploads/${req.file.filename}`,
				});
			}
		}
	});
});

app.listen(port, console.log(`Server running on port ${port}`));
