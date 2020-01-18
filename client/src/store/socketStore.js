import io from 'socket.io-client'

let socket = {};

export default {
	actions: {
		initializeSocket ({commit, dispatch}) {
			socket = io ('//localhost:3000');
			socket.on ('CONNECTED', data => {
				console.log ('Connected to the server socket');
				dispatch ('talk')
			});
			socket.on ('talk', data => {
				console.log (data)
			});
			socket.on ('getRooms')
		}
		, talk ({commit}, msg) {
			socket.emit ('talk', {msg});
		}
		, getRooms ({commit}, data) {
			if (data) {
				commit('setRooms', data);
				return
			}
			socket.emit ('getRooms');
		}
	}
}