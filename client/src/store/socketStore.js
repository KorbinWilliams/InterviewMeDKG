import io from 'socket.io-client';

let socket = {};

export default {
	actions : {
		initializeSocket ( { commit, dispatch, rootState } ) {
			socket = io ('//localhost:3000');
			socket.on ('CONNECTED', data => {
				console.log ('Connected to the server socket');
				socket.on ('receive', payload => this.dispatch ('receive', (payload)));
				socket.on ('getRooms', payload => commit ('setItem', { data : payload.rooms, address : 'lobbies' }));
			});
		}
		, setId ( { rootState } ) {
			socket.emit ('setId', { username : rootState.user.name, uid : rootState.user._id });
		}
		, receive ( { rootState }, msg ) {
			console.log (msg);
			rootState.pageData.chat.push (msg);
		}
		, send ( { rootState }, msg ) {
			socket.username = rootState.user.name;
			socket.uid = rootState.user._id;
			// console.log ();
			socket.emit ('send', { message : msg });
		}
		, getLobbies ( { commit }, socket, data ) {
			if ( data ) {
				commit ('setPageData', { address : 'lobbies', data : data });
				return;
			}
			socket.emit ('getLobbies');
		}
		, createRoom ( { commit, rootState }, socket ) {
			socket.emit ('createLobby', rootState.user._id);
		}
		, exitLobby ( { state }, lobbyId ) {
		
		}
		, join ( { rootState }, lobbyId ) {
		}
	}
};