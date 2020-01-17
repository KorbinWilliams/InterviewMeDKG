class Socket {
	setIO (io) {
		this.io = io;
		this.rooms = {};
		//Server listeners
		io.on ("connection", socket => {
			this.newConnection (socket);
			// socket.on ("join", data => this.joinRoom (socket,data));
			socket.on ('talk', (payload) => this.talk (socket, payload));
		});
	}
	
	newConnection (socket) {
		socket.emit ("CONNECTED", {
			socket: socket.id,
			message: "Successfully Connected"
		});
	}
	
	notifyMessage (message) {
		this.io.emit ("sendMessage", message);
	}
	
	talk (socket, payload) {
		console.log (socket);
		socket.emit('talk', {response: 'Hello!', payload});
	}
}

const socket = new Socket ();
// setTimeout(socket.talk(), 1000)
module.exports = socket;
