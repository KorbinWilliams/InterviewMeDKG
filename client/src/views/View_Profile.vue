<template>
  <div class="container profile">
    <div class="row">
      <div class="col-offset-4">
        <img src alt="User Image" />
        <form>
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
        <p>{{name}}</p>
        <form>
          <input type="text" v-model="profileSettings.name" />
        </form>
        <p>{{email}}</p>
        <form>
          <input type="text" v-model="profileSettings.email" />
        </form>
        <p>{{jobTitle}}</p>
        <form>
          <input type="text" v-model="profileSettings.jobTitle" />
        </form>
        <p>{{jobSkills}}</p>
        <form>
          <input type="text" v-model="profileSettings.jobSkills" />
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button @submit="saveProfile">Save Profile Settings</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "View_Profile",
  props: [],
  data: {
    profileSettings: {
      name: "",
      email: "",
      userImage: "",
      jobTitle: "",
      jobSkills: "",
      InterviewerStatus: "",
      intervieweeStatus: ""
    }
  },
  mounted() {
    this.$store.dispatch("getUserProfile");
  },
  computed: {
    profile() {
      this.$store.state.activeProfile;
    }
  },
  methods: {
    saveProfile() {
      this.$store.dispatch("editProfile", profileSettings);
    }
  }
};
</script>

<style>
</style>
