<template>
	<div id="widget-user">
		<div id="info">
			<h2>{{user.name}}</h2>
		</div>
		<div id="options">
			<router-link>Privacy Settings</router-link>
			<router-link>--Coming Soon, when i remember what was going here... --</router-link>
			<button type="button" @click="logOut" id="btn-log-out">Log Out</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Widget_User"
		, data () {
			return {
				user: this.$store.state.user
			}
		}
		, methods: {
			logOut() {
				this.$store.dispatch("logout").then(res => {
					this.$router.push({ name: "login" });
				});
			}
		}
	}
</script>

<style scoped>

</style>