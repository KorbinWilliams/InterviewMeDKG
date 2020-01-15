class Socket {
  socket(io) {
    this.io = io;
    this.rooms = {};
    //Server listeners
    io.on("connection", socket => this.newConnection(socket));
    io.on("join", data => this.joinRoom(data));
  }
  newConnection(socket) {
    //Handshake/ Confirm connection
    socket.emit("CONNECTED", {
      socket: socket.id,
      message: "Successfully Connected"
    });
  }
}
