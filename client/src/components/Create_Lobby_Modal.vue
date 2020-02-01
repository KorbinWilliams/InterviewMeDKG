<template>
	<div class="view-lobby-modal">
		<md-dialog :md-active.sync="showDialog" style="min-width: 40vw; padding: 3vw;">
			<md-dialog-title>New Lobby</md-dialog-title>
			<md-dialog-content class="lobby-info">
				<form style="display: flex; flex-direction: column; justify-content: center;">
					<label for="lobby-title"> Title: </label>
					<input id="lobby-title" type="text" placeholder="Title" v-model="newTextLobby.title"/>
					<label for="lobby-description"> Description: </label>
					<textarea id="lobby-description" rows="5" type="text" placeholder="Description goes here."
					       v-model="newTextLobby.description"/>
				</form>
			</md-dialog-content>
			<md-dialog-actions class="md-">
				<md-button class="md-primary md-raised" @click="createTextLobby">Save Lobby</md-button>
				<md-button class="md-primary md-raised" @click="showDialog = false">Close</md-button>
			</md-dialog-actions>
		</md-dialog>
		<md-button class="md-primary md-raised" @click="showDialog = true">Create Text Lobby</md-button>
	</div>
</template>

<script>
	export default {
		name: "Create_Lobby_Modal",
		data () {
			return {
				showDialog: false,
				newTextLobby: {
					title: "",
					description: ""
				}
			};
		},
		mounted () {
			this.$store.dispatch('getLobbies');
		},
		computed: {
			lobbies () {
				return this.$store.state.pageData.lobbies;
			}
		},
		methods: {
			createTextLobby () {
				this.$store.dispatch ('createLobby', {title: this.newTextLobby.title, description:
					this.newTextLobby.description});
				this.newTextLobby = {
					title: "",
					description: ""
				}
			}
		}
	};
</script>

<style scoped>
</style>