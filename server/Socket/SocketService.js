class Socket {
    setIO(io) {
        this.io = io
        this.rooms = {}
        //Server listeners
        io.on("connection", socket => this.newConnection(socket));
        io.on("join", data => this.joinRoom(data))
    }

    // nsp here
    newConnection(socket) {
        //Handshake/ Confirm connection
        socket.emit("CONNECTED", {
            socket: socket.id,
            message: "Successfully Connected"
        });
    }

    notifyMessage(message) {
        this.io.emit('sendMessage', message)
    }
    // should we create lobbies on the backend for these functions?

    // var room = io.sockets.adapter.rooms['roomName']
    // declare room var, then room.length
    // if (room.length > 2) { room.pop }
    // or on join return if check fails
}

const socket = new Socket();


module.exports = socket

