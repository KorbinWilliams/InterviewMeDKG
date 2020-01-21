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
          commitAddress: "profile",
          address1: "users",
          address2: "profiles"
        });
      });
    }
  }
};
</script>

<style>
@import "../assets/styles/View_Login.css";
</style>

