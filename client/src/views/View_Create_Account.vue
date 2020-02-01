<template>
  <div id="backboard">
    <notifications group="login" position="top center" max="1" />
    <div id="login">
      <form @submit.prevent="register">
        <label for="input1">Name</label>
        <input id="input1" type="text" v-model="creds.name" required />
        <label for="input2">Email</label>
        <input id="input2" type="text" v-model="creds.email" required />
        <label for="input3">Password</label>
        <input id="input3" type="password" v-model="creds.password" required />
        <label for="input4">Repeat Password</label>
        <input id="input4" type="password" v-model="creds.repeatPass" required />
        <button type="submit">Login</button>
      </form>
      <p>
        Already have an account?
        <router-link to="/login" tag="h6" id="sign-up">Login here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "View_Create_Account",
  components: {},
  data() {
    return {
      creds: {
        email: "",
        password: "",
        repeatPass: "",
        name: ""
      }
    };
  },
  methods: {
    register() {
      let password = this.creds.password;
      if (password !== this.creds.repeatPass) {
        this.$notify({
          group: "login",
          title: "Bad Password",
          text: "Please make sure your passwords match.",
          duration: 3500
        });
        return;
      } else if (password.length < 8) {
        this.$notify({
          group: "login",
          title: "Bad Password",
          text: "Please make sure your password is at least 8 characters long.",
          duration: 3500
        });
        return;
      } else if (
         !password.match(/[0-9]/g) ||
        !password.match(/[a-z]/g) ||
        !password.match(/[A-Z]/g)
      ) {
        this.$notify({
          group: "login",
          title: "Bad Password",
          text:
            "Please make sure your password has at least 1 uppercase and lowercase character and number.",
          duration: 3500
        });
        return;
      }

      this.$store.dispatch("register", this.creds).then(res =>
        this.$store.dispatch("create", {
          data: {
            name: this.$store.state.user.name,
            email: this.$store.state.user.email,
            userId: this.$store.state.user._id
          },
          address: "profiles",
          commit: "setItem",
          commitAddress: "profile"
        })
      );
    }
  }
};
</script>

<style scoped>
@import "../assets/styles/View_Login.css";
</style>
