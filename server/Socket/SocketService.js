import fs from 'fs';

//TODO Return filtered list of rooms based on search term sent by client, search in the title, categories, and
// description, in that order. This will require searching through ALL rooms on each request from client. Dont know
// if there is a better way than the standard .includes.
//NOTE This will need to be case sensitive and should be accomplish with a simple Array.includes and String.includes.

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
		try {
			this.io.emit ('receive', data);
		} catch (e) {
			console.log ('There has been an error: ' + e.message);
			handlE (e);
		}
		// console.log ();
		
		//FIXME This write multiple top-level json objects to the file, which is not allowed according to the json
		// standard. This will need to read first, parse, then add date to that object; from there it will need to
		// stringify the object, then write to the json file.
		let fileData = JSON.stringify ({
			message: data.message
			, username: data.username
			, time: getDate (true)
		}, null, 4);
		let today = getDate ();
		fs.writeFileSync ('./text_chat/' + Object.keys (socket.rooms)[0] + '~' + today + '.json'
		, fileData
		, {flag: 'a'}
		, function (error) {
			handlE (error);
		});
	}
	
	//TODO Push update to clients to notify them of new room creation.
	//TODO Save categories add to room in array and save in local memory and db.
	createRoom (socket, data) {
		// checkRooms (socket);
		socket.join ('' + data.uid);
		let room = this.Room (data.uid);
		room.public = true;
		room.title = data.title;
		room.description = data.description;
		room.id = data.uid;
		socket.emit ('createLobby', this.Room (data.uid));
	}
	
	//TODO Make room checking (checkConnection as below) function and add room checking in joinRoom function.
	joinRoom (socket, payload) {
		try {
			socket.join ('' + payload.lobbyId);
			socket.emit ('joinLobby', {
				message: 'Successfully Joined',
				lobby: this.Room (payload.lobbyId)
			});
			socket.to ('' + payload.lobbyId).emit ('user join', payload.user);
			if (Object.keys (this.Room (payload.lobbyId).sockets).length >= 2) {
				this.Room (payload.lobbyId).public = false;
			}
		} catch (e) {
			handlE (e);
			socket.emit ('joinRoom', {
				error: e,
				message: e.message
			})
		}
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

// Used to make sure the socket is not connected to another room.
// function checkRooms (SOCKET) {
// 	let roomId = Object.keys(SOCKET.rooms)[0];
// 	console.log (roomId, socket.Room(roomId).public, socket.Room(roomId));
// 	if(socket.Room(roomId).public === true) {
// 		SOCKET.emit ('joinRoom', {
// 			error: {
// 				message: 'Cannot join a lobby while still in a lobby. If you think this is an error, try reloading. If you are still experiencing problems please report them.'
// 				,status: 403
// 			}
// 		});
// 		return;
// 	}
// 	console.log (roomId, socket.Room(roomId).public, socket.Room(roomId));
// }

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

//Generic error handler and logger - writes errors to files as JSON objects for future use/reference.
function handlE (error, inBool = false) {
	let calledOnce = inBool;
	console.log ('There has been an error: ' + error);
	let date = getDate ();
	fs.writeFileSync (`./ErrorLogs/${date}.json`, JSON.stringify (error), {flag: 'a'}, (error) => {
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