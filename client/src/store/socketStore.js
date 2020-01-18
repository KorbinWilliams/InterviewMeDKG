import io from 'socket.io-client'

let socket = {};

export default {
	actions: {
		initializeSocket ({commit, dispatch}) {
			socket = io ('//localhost:3000');
			socket.on ('CONNECTED', data => {
				console.log ('Connected to the server socket');
				socket.on ('talk', payload => this.talk(socket, data));
				socket.on ('getRooms', payload => commit('setItem', {data: payload.rooms, address: 'lobbies'}));
			});
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