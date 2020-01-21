<template>
	<section id="chat">
		<Widget_User/>
		<div id="chat-box">
			<p v-for="item in chat">{{ item.message }}</p>
		</div>
		<label for="text-chat-input"/>
		<input type="text" id="text-chat-input" v-model="userInput"/>
		<button type="button" @click="talk">Send</button>
		<button type="button" @click="getLobbies">Join</button>
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
		methods: {
			talk () {
				let message = this.userInput;
				//TODO Send notification that the user needs to actually type something.
				if (!message) return;
				this.$store.dispatch ("send", message);
			},
			getLobbies () {
				this.$store.dispatch ("getLobbies");
			}
		}
	};
</script>

<style scoped>
</style>