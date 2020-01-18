class Socket {
	setIO (io) {
		this.io = io;
		this.rooms = {};
		//Server listeners
		io.on ("connection", socket => {
			this.newConnection (socket);
			socket.on ('join', data => this.joinRoom (socket, data));
			socket.on ('getRooms', ()=>this.getRooms(socket));
			socket.on ('talk', (msg) => this.talk (socket, msg));
		});
	}
	
	newConnection (socket) {
		socket.emit ("CONNECTED", {
			socket: socket.id,
			message: "Successfully Connected"
		});
	}
	
	joinRoom (socket, data) {
		socket.join(data.room);
	}
	
	talk (socket, msg) {
		socket.emit ("talk", msg);
	}
	
	getRooms (socket) {
		console.log (socket, 'rooms: '+socket.rooms);
		socket.emit()
	}
}

const socket = new Socket ();
module.exports = socket;
