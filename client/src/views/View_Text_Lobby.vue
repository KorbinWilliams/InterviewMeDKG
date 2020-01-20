<template>
    <section id="chat">
        <div id="chat-box">
            <p v-for="item in chat">{{ item.message }}</p>
        </div>
        <label for="text-chat-input"/>
        <input type="text" id="text-chat-input">
        <button type="button" @click="talk">Send</button>
        <button type="button" @click="this.$store.dispatch('joinLobby')">Join</button>
    </section>
</template>

<script>
	export default {
		name : 'View_Text_Lobby'
		, computed : {
			chat () {
				return this.$store.state.pageData.chat;
			}
		}
		, methods : {
			talk () {
				let message = document.getElementById ('text-chat-input').value;
				if ( !message ) return;
				this.$store.dispatch ('send', message);
			}
		}

	};
</script>

<style scoped>

</style>