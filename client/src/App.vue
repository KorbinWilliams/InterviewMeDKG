<template>
	<div id="app">
		<router-view/>
		<notifications group="primary"/>
		<notifications group="error"/>
	
	</div>
</template>

<script>
	export default {
		name: "App"
		, components: {
			// VueNotify
		}
	};
</script>

<style>
@import "assets/styles/View_Global.scss";
</style>