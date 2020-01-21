<template>
	<section id="chat">
		<div id="chat-box">
			<p v-for="item in chat">{{ item.message }}</p>
		</div>
		<label for="text-chat-input"/>
		<input type="text" id="text-chat-input"/>
		<button type="button" @click="talk">Send</button>
		<button type="button" @click="getLobbies">Join</button>
	</section>
</template>

<script>
	export default {
		name: "View_Text_Lobby",
		data () {
			return {}
		},
		mounted () {
			if (!this.$store.state.lobby.public) {
				this.$router.push ('text_lobbies')
			}
		},
		computed: {
			chat () {
				return this.$store.state.pageData.chat;
			}
		},
		methods: {
			talk () {
				let message = document.getElementById ("text-chat-input").value;
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