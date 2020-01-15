<template>
	<md-menu id="widget-user">
		<md-button>
			<img src="../assets/media/settings.svg" alt="Settings" class="md-icon">
		</md-button>
		<md-menu-content class="widget-content">
			<div id="info">
				<h2>{{user.name}}</h2>
			</div>
			<div id="options">
				<md-menu-item>
					<router-link to="/" tag="p">Privacy Settings</router-link>
				</md-menu-item>
				<md-menu-item>
				<router-link to="/" tag="p">--Coming Soon, when i remember what was going here... --</router-link>
				</md-menu-item>
				<button type="button" @click="logOut" id="btn-log-out">Log Out</button>
			</div>
		</md-menu-content>
	</md-menu>
</template>

<script>
	import {MdMenu, MdButton} from 'vue-material';
	import 'vue-material/dist/vue-material.min.css';
	import 'vue-material/dist/theme/default.css';
	
	// Vue.use(MdAvatar);
	
	export default {
		name: "Widget_User"
		, components: {
			MdMenu
			, MdButton
		}
		, data () {
			return {
				user: this.$store.state.user
			}
		}
		, methods: {
			logOut() {
				this.$store.dispatch("logout").then(res => {
					this.$router.push("login");
				});
			}
		}
	}
</script>
<style scoped>
@import "../assets/styles/Widget_User.scss";
</style>