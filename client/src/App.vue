<template>
	<div id="app">
		<router-view/>
		<notifications group="primary"/>
		<notifications group="error"/>
	</div>
</template>

<script>
	import Widget_User from "./components/Widget_User";
	
	export default {
		name: "App"
		, components: {
		}
	};
</script>

<style>
@import "assets/styles/View_Global.scss";
</style>