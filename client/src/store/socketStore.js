import io from 'socket.io-client';

let socket = {};

export default {
	actions: {
		initializeSocket ({commit, dispatch, rootState}) {
			socket = io ('//localhost:3000');
			socket.on ('CONNECTED', data => {
				console.log ('Connected to the server socket', data);
				socket.on ('receive', payload => this.dispatch ('receive', (payload)));
				socket.on ('getLobbies', payload => commit ('setPageData', {data: payload, address: 'lobbies'}));
				socket.on ('createLobby', payload => {
					socket.on ('joinLobby', payload => console.log (paylaod));
					console.log (payload);
					commit ('setItem', {data: payload, address: 'lobby'})
				});
				socket.on ('user join', payload => rootState.currentLobby = {});
				socket.on ('user leave');
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
		, createLobby ({commit, rootState}, lobbyData) {
			socket.emit ('createLobby', {
				uid: rootState.user._id
				, user: rootState.profile
				, lobbyData
			});
			console.log (socket)
		}
		, join ({rootState}, lobbyId) {
			socket.emit ('join', {
				uid: rootState.user._id
				, user: rootState.profile
				, lobbyId: lobbyId
			})
		}
		, exitLobby ({rootState}, lobbyId) {
			socket.emit ('exitLobby', {
				uid: rootState.user._id
				, lobbyId: lobbyId
			});
		}
	}
};