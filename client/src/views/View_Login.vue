<template>
  <div id="backboard">
    <notifications group="login" />
    <div id="login">
      <form @submit.prevent="loginUser">
        <label for="input1">Email</label>
        <input id="input1" type="text" v-model="creds.email" required />
        <label for="input2">Password</label>
        <input id="input2" type="text" v-model="creds.password" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account?
        <router-link to="/sign_up" tag="h6" id="sign-up">Create One</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      creds: {
        email: "",
        password: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "/" });
    }
  },
  methods: {
    loginUser() {
      this.$store.dispatch("login", this.creds).then(res => {
        this.$store.dispatch("getOneByAnother", {
          data: { _id: this.$store.state.user._id },
          commit: "setItem",
          commitAddress: "profile",
          address1: "account",
          address2: "profiles"
        });
      });
    }
  }
};
</script>

<style scoped>
@import "../assets/styles/View_Login.css";

#backboard {
  background-image: url("https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80");
  background-size: cover;
}
</style>

