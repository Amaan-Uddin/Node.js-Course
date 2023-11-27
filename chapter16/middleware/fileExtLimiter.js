const path = require('path');
const fileExtLimiter = (allowedExtArray) => {
	return (req, res, next) => {
		const files = req.files;

		const fileExtentions = [];

		Object.keys(files).forEach((key) => {
			fileExtentions.push(path.extname(files[key].name));
		});

		// are the file ext allowed
		const allowed = fileExtentions.every((ext) =>
			allowedExtArray.includes(ext)
		);

		if (!allowed) {
			const message =
				`Upload failed. Only ${allowedExtArray.toString()} ext are allowed`.replace(
					',',
					', '
				);
			return res.status(422).json({ status: 'error', message }); // Unprocessable Entity
		}
		next();
	};
};

module.exports = fileExtLimiter;
