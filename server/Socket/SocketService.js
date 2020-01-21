import fs from 'fs';

class Socket {
	setIO (io) {
		this.io = io;
		//Server listeners
		io.on ('connection', socket => {
			this.newConnection (socket);
			socket.on ('createLobby', payload => this.createRoom (socket, payload));
			socket.on ('join', payload => this.joinRoom (socket, payload));
			socket.on ('getLobbies', () => this.getRooms (socket));
			socket.on ('send', (payload) => this.talk (socket, payload));
			socket.on ('exitLobby', payload => this.exitRoom (payload));
		});
		this.Room = (socketId) => {
			return this.io.sockets.adapter.rooms[socketId];
		}
	}
	
	//Sets the id in object for reference down the road. Easiest solution I could find.
	newConnection (socket) {
		// console.log ('New Connection' + socket.id);
		socket.emit ('CONNECTED', {
			socket: socket.id,
			public: !!socket.public,
			message: 'Successfully Connected'
		});
	}
	
	
	talk (socket, data) {
		// console.log ();
		try {
			this.io.emit ('receive', data);
			console.log ('Error: ' + e);
		} catch (e) {
			handlE (e);
		}
		// console.log ();
		
		let today = getDate ();
		fs.writeFileSync ('./text_chat/' + Object.keys (socket.rooms)[0] + '~' + today + '.json', JSON.stringify ({
			message: data.message
			, time: getDate (true)
		}), function (error) {
			handlE (error);
		});
	}
	
	//#FIXME Push update to clients to notify them of new room creation.
	createRoom (socket, data) {
		console.log ('Creating room, roomId: ' + data.uid);
		socket.join ('' + data.uid);
		this.Room (data.uid).public = true;
		socket.emit ('createLobby', this.Room (data.uid));
	}
	
	//#TODO Make room checking (checkConnection as below) function and add room checking in joinRoom function.
	joinRoom (socket, payload) {
		// Used to make sure the socket is not connected to another room.
		// checkConnection (socket) {
		//
		// }
		socket.join ('' + payload.lobbyId);
		socket.emit ('joinRoom', {
			message: 'Successfully Joined',
			room: this.Room (payload.lobbyId)
		});
		socket.to ('' + payload.lobbyId).emit ('user join', payload.user);
	}
	
	getRooms (socket) {
		// console.log (this.io.sockets.adapter.rooms);
		let filteredRooms = [];
		let roomsPreFilter = this.io.sockets.adapter.rooms;
		
		roomsPreFilter.forEach (cur => {
			if (cur.public) {
				filteredRooms.push (cur);
			}
		});
		
		socket.emit ('getLobbies', filteredRooms);
	}
	
	exitRoom (socket, payload) {
		socket.leave (payload.lobbyId);
		io.to ('' + lobbyId).emit ('user leave')
	}
}

//Returns date for writing to file and keeping track of timeline - if passed true it will return Day - Hour:Minute
function getDate (bool) {
	
	let d = new Date (),
	year = d.getFullYear (),
	month = '' + (d.getMonth () + 1),
	day = '' + d.getDate (),
	hour = '' + d.getMinutes (),
	minute = '' + d.getMinutes ();
	
	if (month.length < 2) {
		month = '0' + month;
	}
	if (day.length < 2) {
		day = '0' + day;
	}
	
	if (bool) {
		return `${day} - ${hour}:${minute}`;
	}
	
	return [year, month, day].join ('-');
}

//Generic error handler and logger - writes errors to files as JSON objects for future use.
function handlE (error, inBool = false) {
	let calledOnce = inBool;
	console.log ('There has been an error: ', error);
	let date = getDate ();
	fs.writeFileSync (`./ErrorLogs/${date}`, JSON.stringify (error), (error) => {
		console.log ('Can not write error to file: ' + error.message);
		if (!calledOnce) {
			handlE (error, true);
		} else {
			console.log ('Could not write file on second attempt. Here is the full error: ', error);
			return null;
		}
	});
}

const socket = new Socket ();
export default socket;

// Object-forEach Polyfill - :)
if (!Object.prototype.forEach) {
	Object.defineProperty (Object.prototype, "forEach", {
		value: function (callback, thisArg) {
			if (this == null) {
				throw new TypeError ("Not an object");
			}
			for (let key in this) {
				if (this.hasOwnProperty (key)) {
					callback.call (thisArg, this[key], key, this);
				}
			}
		}
	});
}