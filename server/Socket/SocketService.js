import fs from 'fs';

class Socket {
	setIO ( io ) {
		this.users = {};
		this.io = io;
		this.rooms = {};
		//Server listeners
		io.on ('connection', socket => {
			socket.on ('setId', function ( socket, data ) {
				this.users[data.username] = data.uid;
			});
			this.newConnection (socket);
			socket.on ('createLobby', uid => this.joinRoom (socket, uid));
			socket.on ('join', data => this.joinRoom (socket, data));
			socket.on ('getLobbies', () => this.getRooms (socket));
			socket.on ('send', ( msg ) => this.talk (socket, msg));
			socket.on ('exitLobby', payload => this.exitRoom (payload));
		});
	}
	
	//Sets the id in object for reference down the road. Easiest solution I could find.
	setId ( socket, data ) {
		this.users[data.username] = data.uid;
	}
	
	newConnection ( socket ) {
		// console.log ('New Connection' + socket.id);
		socket.emit ('CONNECTED', {
			socket : socket.id,
			message : 'Successfully Connected'
		});
	}
	
	joinRoom ( socket, uid ) {
		socket.join (uid);
	}
	
	talk ( socket, data ) {
		console.log (socket.uid);
		this.io.of ('' + this.users[data.username]).emit ('receive', data);
		console.log ();
		
		let today = getDate ();
		fs.writeFileSync ('./text_chat/' + Object.keys (socket.rooms)[0] + '~' + today + '.json', JSON.stringify ({
			user : socket.username
			, message : data.message
			, time : getDate (true)
		}), function ( error ) {
			handlE (error);
		});
	}
	
	createRoom ( socket ) {
	
	}
	
	getRooms ( socket ) {
		console.log (socket, 'rooms: ' + socket.rooms);
		socket.emit (/*send the rooms only to the person who requested them without forcing them into a private room, i think this can be done by setting the user id as the socket, possibly the userid+serverSocketId to prevent spam?? maybe userId+randNum instead*/'userId', socket.nsp['/text_chat'].rooms);//No clue if this actually works, still just getting the init connection string 'Successfully Connected' instead of the actual fucking string :\
	}
	
	exitRoom () {
	}
}

//Returns date for writing to file and keeping track of timeline - if passed true it will return Day - Hour:Minute
function getDate ( bool ) {
	
	let d = new Date (),
		year = d.getFullYear (),
		month = '' + (d.getMonth () + 1),
		day = '' + d.getDate (),
		hour = '' + d.getMinutes (),
		minute = '' + d.getMinutes ();
	
	if ( month.length < 2 ) {
		month = '0' + month;
	}
	if ( day.length < 2 ) {
		day = '0' + day;
	}
	
	if ( bool ) {
		return `${ day } - ${ hour }:${ minute }`;
	}
	
	return [ year, month, day ].join ('-');
}

//Generic error handler and logger - writes errors to files as JSON objects for future use.
function handlE ( error, inBool = false ) {
	let calledOnce = inBool;
	console.log ('There has been an error: ', error);
	let date = getDate ();
	fs.writeFileSync (`./ErrorLogs/${ date }`, JSON.stringify (error), ( error ) => {
		console.log ('Can not write error to file: ' + error.message);
		if ( !calledOnce ) {
			handlE (error, true);
		} else {
			console.log ('Could not write file on second attempt. Here is the full error: ', error);
			return;
		}
	});
}

const socket = new Socket ();
export default socket;
