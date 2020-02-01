<template>
	<section id="chat">
		<Widget_User/>
		<div id="chat-box" class="md-layout md-gutter" style="padding-top:25px; ">
			<div class="">
				<md-card v-for="item in chat" class="chat-item md-layout-item" v-bind:class="{'received': item.received}">
					<md-toolbar :class="{'md-accent received': item.received, 'sent': !item.received}">
						<md-subheader v-if="item.received" class="username">{{item.username}}</md-subheader>
						<md-subheader v-if="!item.received" class="username">{{item.username}}</md-subheader>
						<p v-if="item.received" class="md-list-item-text">{{item.message}}</p>
						<p v-if="!item.received" class="md-list-item-text">{{item.message}}</p>
					</md-toolbar>
				</md-card>
			</div>
		</div>
		<md-bottom-bar id="chat-input-form" class="md-layout md-position-bottom">
			<md-field style="display: flex; flex-direction: row;">
				<label for="text-chat-input">Message</label>
				<md-textarea type="text" id="text-chat-input" v-model="userInput"/>
			</md-field>
			<md-button class="md-button-spaced md-raised" type="button" @click="talk">Send</md-button>
		</md-bottom-bar>
	</section>
</template>

<script>
	import Widget_User from "../components/Widget_User";
	
	export default {
		name: "View_Text_Lobby",
		components: {Widget_User},
		data () {
			return {
				userInput: ''
			}
		},
		mounted () {
			if (!this.$store.state.lobby.public) {
				this.$router.push ('text_lobbies')
			}
			this.$notify ({
				group: 'primary'
				, title: 'Joined Lobby'
				, text: 'You have successfully joined the lobby.'
			})
		},
		computed: {
			chat () {
				return this.$store.state.pageData.chat;
			}
		},
		updated () {
			document.getElementById ('chat-box').scrollTop = document.getElementById ('chat-box').scrollHeight;
		},
		methods: {
			talk () {
				let message = this.userInput;
				//TODO Send notification that the user needs to actually type something.
				if (!message) {
					this.$notify ({
						group: 'error'
						, title: 'Please provide input.'
					});
				}
				this.$store.dispatch ("send", message);
				this.userInput = '';
			},
			getLobbies () {
				this.$store.dispatch ("getLobbies");
			}
		}
		, beforeDestroy () {
			this.$store.dispatch('exitLobby', this.$store.state.lobby.socket);
		}
	};
</script>

<style scoped>
	@import "../assets/styles/View_Text_Lobby.css";
</style>