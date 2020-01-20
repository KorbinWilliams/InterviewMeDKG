<template>
    <div>
        <div class="lobby" v-for="lobby in lobbies" :id="lobby._id">
            <h2>{{ lobby.owner }}</h2>
            <p>{{ lobby.description }}</p>
            <button type="button" @click="this.$store.dispatch('joinLobbies', lobby._id)">Join</button>
        </div>
    </div>
</template>

<script>
	export default {
		name : 'View_Categories'
		, mounted () {
			this.$store.dispatch ('getLobbies');
		}
		, computed : {
			lobbies () {
				return this.$store.state.pageData.lobbies;
			}
		}
	};
</script>

<style scoped>
    @import "../assets/styles/View_Text_Lobbies.css";
</style>