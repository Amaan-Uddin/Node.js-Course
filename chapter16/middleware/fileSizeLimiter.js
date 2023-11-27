const MB = 5; // 5 MB(mega bytes)
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
	const files = req.files;

	const filesOverLimit = []; // an array of files that are over the size limit

	// determine the files over limit
	Object.keys(files).forEach((key) => {
		if (files[key].size > FILE_SIZE_LIMIT) {
			filesOverLimit.push(files[key].name);
		}
	});

	if (filesOverLimit.length) {
		const message = `Upload failed. ${filesOverLimit.toString()} file over the size limit ${MB} MB`;

		return res.status(413).json({ status: 'error', message }); // Content Too Large
	}
	next();
};

module.exports = fileSizeLimiter;
