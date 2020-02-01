import io from 'socket.io-client';
import router from '../router/index'

//TODO Add router gaurd at leave from text_lobby view to prevent the user from leaving without clicking a butto, @click should notify the server.

let socket = {};

export default {
	actions: {
		initializeSocket ({commit, dispatch, rootState}) {
			socket = io ('//localhost:3000');
			socket.on ('CONNECTED', data => {
				console.log ('Connected to the server socket');
				commit ('setItem', {address: 'lobby', data});
				socket.on ('receive', payload => {
					if (payload.uid !== rootState.user._id) {
						payload.received = true;
					}
					this.dispatch ('receive', (payload))
				});
				socket.on ('getLobbies', payload => commit ('setPageData', {data: payload, address: 'lobbies'}));
				socket.on ('createLobby', payload => {
					commit ('setItem', {data: payload, address: 'lobby'});
					router.push('text_lobby');
				});
				socket.on ('joinLobby', payload => {
					commit ('setItem', {address: 'lobby', data: payload.lobby});
					router.push ('text_lobby')
				});
				socket.on ('user join', payload => commit ('setOne', {data: payload.lobby}));
				//TODO reset lobby to empty object and push back to text_lobbies.
				socket.on ('user leave', payload => {
				
				});
				
			});
		}
		
		, receive ({rootState}, msg) {
			rootState.pageData.chat.push (msg);
		}
		
		, send ({rootState}, msg) {
			// console.log ();
			socket.emit ('send', {
				uid: rootState.user._id
				, message: msg
				, username: rootState.user.name
				, user: rootState.profile
			});
		}
		
		, getLobbies ({commit}) {
			socket.emit ('getLobbies');
		}
		
		, createLobby ({commit, rootState}, lobbyData) {
			socket.emit ('createLobby', {
				uid: rootState.user._id
				, user: rootState.profile
				, title: lobbyData.title
				, description: lobbyData.description
			});
		}
		
		, join ({rootState}, lobbyId) {
			socket.emit ('join', {
				uid: rootState.user._id
				, user: rootState.profile
				, lobbyId: lobbyId
			})
		}
		
		, exitLobby ({rootState}, lobbyId) {
			console.log (lobbyId);
			debugger;
			socket.emit ('exitLobby', {
				uid: rootState.user._id
				, lobbyId: lobbyId
			});
		}
	}
};