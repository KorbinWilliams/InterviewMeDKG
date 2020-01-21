<template>
  <div class="view-categories">
    <Create_Lobby_Modal />
    <div class="lobby" v-for="lobby in lobbies" :id="lobby._id">
      <h2>{{ lobby.owner }}</h2>
      <p>{{ lobby.description }}</p>
      <button
        type="button"
        @click="this.$store.dispatch('joinLobbies', lobby._id)"
      >
        Join
      </button>
    </div>
  </div>
</template>

<script>
import Create_Lobby_Modal from "../components/Create_Lobby_Modal";

export default {
  name: "View_Categories",
  mounted() {
    this.$store.dispatch("getLobbies");
  },
  computed: {
    lobbies() {
      return this.$store.state.pageData.lobbies;
    }
  },
  methods: {
    // joinLobby() {
    // 	dispatch("setItem", {
    // 		data: ,
    // 		address: ,
    // 	}).then(res => {
    // 		// add profile data to pageData?
    // 	})
    // }
  },
  components: {
    Create_Lobby_Modal
  }
};
</script>

<style scoped>
@import "../assets/styles/View_Text_Lobbies.css";
</style>
