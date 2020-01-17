import io from 'socket.io-client'

let socket = {};

export default {
	actions: {
		initializeSocket ({commit, dispatch}) {
			socket = io ('//localhost:3000');
			socket.on ('CONNECTED', data => {
				console.log ('Connected to the server socket');
				dispatch('talk')
			});
			socket.on ('talk', data => {
				console.log (data)
			});
		}
 		, talk ({commit}) {
			socket.emit ('talk', {msg: 'hello!'});
		}
	}
}