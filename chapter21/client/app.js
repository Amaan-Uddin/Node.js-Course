const socket = io('ws://localhost:3000');

function sendMessage(e) {
	e.preventDefault();
	const input = document.querySelector('input');
	if (input.value) {
		socket.emit('message-sent', input.value);
		input.value = '';
	}
}

function displayMessage(data) {
	const child = document.createElement('div');
	child.textContent = data;
	document.querySelector('.message-box').appendChild(child);
}

socket.on('connect', () => {
	console.log(socket.id);
});

document.querySelector('form').addEventListener('submit', sendMessage);

socket.on('message', (data) => {
	displayMessage(data);
});
