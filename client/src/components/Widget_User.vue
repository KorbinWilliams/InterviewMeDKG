<template>
  <md-menu id="widget-user" md-align-trigger>
    <md-button md-menu-trigger id="widget-trigger">
      <img src="../assets/media/settings.svg" alt="Settings" class="md-icon" id="widget-user-icon"/>
    </md-button>

    <md-menu-content class="widget-content">
      <div id="info">
        <h3 id="widget-username">{{ user.name }}</h3>
      </div>
      <md-menu-item>
        <router-link to="settings_privacy" tag="a"
          >Privacy Settings</router-link
        >
      </md-menu-item>
      <md-menu-item>
        <router-link to="profile" tag="a">Profile</router-link>
      </md-menu-item>
      <md-menu-item>
        <router-link to="home" tag="a">Home</router-link>
      </md-menu-item>
      <md-menu-item>
        <router-link to="quiz_form" tag="a">Create Quiz</router-link>
      </md-menu-item>
      <button type="button" @click="logOut" id="btn-log-out">Log Out</button>
    </md-menu-content>
  </md-menu>
</template>

<script>
export default {
  name: "Widget_User",
  components: {},
  data() {
    return {
      user: this.$store.state.user
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch("logout").then(res => {
        this.$router.push("login");
      });
    }
  }
};
</script>
<style scoped>
@import "../assets/styles/Widget_User.scss";
</style>
