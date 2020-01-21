<template>
  <div class="container profile bg-profile">
    <div class="row">
      <Widget_User />
    </div>
    <div class="row">
      <div class="col-offset-4">
        <img :src="profileSettings.userImage" alt="User Image" />
        <form>
          <label for="Set User Image"></label>
          <input type="text" v-model="profileSettings.userImage" />
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-6 status">
        <p>{{ interviewerStatus }}</p>
        <form>
          <input type="text" v-model="profileSettings.interviewerStatus" />
        </form>
        <p>{{ intervieweeStatus }}</p>
        <form>
          <input type="text" v-model="profileSettings.intervieweeStatus" />
        </form>
      </div>
      <div class="col-6 general-info">
        <p>{{ name }}</p>
        <form>
          <input type="text" v-model="profileSettings.name" />
        </form>
        <p>{{ email }}</p>
        <form>
          <input type="text" v-model="profileSettings.email" />
        </form>
        <p>{{ jobTitle }}</p>
        <form>
          <input type="text" v-model="profileSettings.jobTitle" />
        </form>
        <p>{{ jobSkills }}</p>
        <form>
          <input type="text" v-model="profileSettings.jobSkills" />
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col justify-content-center">
        <button @submit="saveProfile">Save Profile Settings</button>
      </div>
    </div>
  </div>
</template>

<script>
import Widget_User from "../components/Widget_User";

export default {
  name: "View_Profile",
  props: [],
  data() {
    return {
      profileSettings: {
        name: "",
        email: "",
        userImage: "",
        jobTitle: "",
        jobSkills: "",
        InterviewerStatus: "",
        intervieweeStatus: ""
      }
    };
  },
  // mounted() {},
  computed: {
    profiles() {
      this.$store.state.userProfile;
    }
  },
  methods: {
    saveProfile() {
      this.$store.dispatch("edit", {
        data: this.profileSettings,
        _id: this.$store.state.profile._id,
        address: "profiles",
        commit: "setItem",
        commitAdress: "profile"
      });
    }
  },
  components: {
    Widget_User
  }
};
</script>

<style>
.bg-profile {
  background-color: mediumseagreen;
}
</style>
