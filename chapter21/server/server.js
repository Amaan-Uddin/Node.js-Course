const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: ['http://127.0.0.1:5500/chapter21/client/'],
});

httpServer.listen(3000, () => {
	console.log(`Server running on port 3000`);
});

io.on('connection', (socket) => {
	console.log('user ' + socket.id + ' connected');
	socket.on('message-sent', (data) => {
		io.emit('message', `${socket.id.substring(0, 5)}:  ${data}`);
	});
});
