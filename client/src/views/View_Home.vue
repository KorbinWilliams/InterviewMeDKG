<template>
	<div id="home">
		<Widget_User/>
		<button type="button" @click="talk">Talk</button>
	</div>
</template>

<script>
	import Widget_User from "../components/Widget_User";
	
	export default {
		name: "View_Home"
		, components: {
			Widget_User
		}
		, mounted () {
		
		}
		, methods: {
			talk () {
				this.$store.dispatch('talk');
			}
		}
	}
</script>

<style scoped>

</style>