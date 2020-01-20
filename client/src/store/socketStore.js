import io from 'socket.io-client';

let socket = {};

export default {
	actions: {
		initializeSocket ({commit, dispatch, rootState}) {
			socket = io ('//localhost:3000');
			socket.on ('CONNECTED', data => {
				console.log ('Connected to the server socket');
				socket.on ('receive', payload => this.dispatch ('receive', (payload)));
				socket.on ('getLobbies', payload => commit ('setItem', {data: payload, address: 'lobbies'}));
			});
		}
		, receive ({rootState}, msg) {
			// console.log (msg);
			rootState.pageData.chat.push (msg);
		}
		, send ({rootState}, msg) {
			// console.log ();
			socket.emit ('send', {uid: rootState.user._id, message: msg});
		}
		, getLobbies ({commit}) {
			socket.emit ('getLobbies');
		}
		, createLobby ({commit, rootState}, socket) {
			socket.emit ('createLobby', {
				uid: rootState.user._id
				,user: rootState.profile
				,lobbyData: {
					title: '',
					description: ''
				}});
		}
		, exitLobby ({rootState}, lobbyId) {
			socket.emit('exitLobby', {
				uid: rootState.user._id
				, lobbyId
			})
		}
		, join ({rootState}, lobbyId) {
			socket.emit('join', {
				uid: rootState.user._id
				, lobbyId
			})
		}
	}
};