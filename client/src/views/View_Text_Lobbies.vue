<template>
	<div class="view-categories">
		<Create_Lobby_Modal id="create-lobby-btn"/>
		
		<div id="display-lobbies">
			<div class="lobby" v-for="lobby in lobbies" :id="lobby._id" @click="joinLobby(lobby.id)">
				<h2>{{ lobby.title }}</h2>
				<p>{{ lobby.description }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import Create_Lobby_Modal from "../components/Create_Lobby_Modal";
	
	export default {
		name: "View_Categories",
		mounted () {
			this.$store.dispatch ("getLobbies");
		},
		computed: {
			lobbies () {
				return this.$store.state.pageData.lobbies;
			}
		},
		methods: {
			joinLobby (lobbyId) {
				this.$store.dispatch ('join', lobbyId);
			}
		},
		components: {
			Create_Lobby_Modal
		}
	};
</script>

<style scoped>
@import "../assets/styles/View_Text_Lobbies.css";
</style>