<template>
  <div class="container-fluid view-profile bg-profile">
    <div class="row">
      <Widget_User />
    </div>
    <div class="row justify-content-center">
      <div class="col-offset-4">
        <h3>{{ profile.name }}</h3>
        <img
          :src="this.$store.state.profile.userImage"
          alt="user image"
          height="100px"
          width="200px"
        />
        <form>
          <label for="Set User Image"></label>
          <input type="text" v-model="profileSettings.userImage" placeholder="change user image" />
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-6 box">
        <h5>Interviewer Status</h5>
        <p v-if="this.$store.state.profile.interviewerStatus == true">Looking to hire</p>
        <p v-else>Not hiring</p>
        <select v-model="profileSettings.interviewerStatus">
          <option disabled>Change interviewer status</option>
          <option value="true">Looking to hire</option>
          <option value="false">Not hiring</option>
        </select>
        <h5>interviewee Status</h5>
        <p v-if="this.$store.state.profile.intervieweeStatus == true">Looking for work</p>
        <p v-else>Not looking for work</p>
        <select v-model="profileSettings.intervieweeStatus">
          <option disabled>Change interviewee status</option>
          <option value="true">Looking for work</option>
          <option value="false">Not looking for work</option>
        </select>
      </div>
      <div class="col-6 general-info box">
        <h5>User Email</h5>
        <p>{{ profile.email }}</p>
        <form>
          <input type="text" v-model="profileSettings.email" placeholder="change email" />
        </form>
        <h5>User Job Title</h5>
        <p>{{ profile.jobTitle }}</p>
        <form>
          <input type="text" v-model="profileSettings.jobTitle" placeholder="change job title" />
        </form>
        <h5>User Job Skills</h5>
        <p>{{ profile.jobSkills }}</p>
        <form>
          <input type="text" v-model="profileSettings.jobSkills" placeholder="change job skills" />
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col d-flex justify-content-center">
        <button @click="saveProfile">Save Profile Settings</button>
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
        email: "",
        userImage: "",
        jobTitle: "",
        jobSkills: "",
        InterviewerStatus: Boolean,
        intervieweeStatus: Boolean,
        _id: this.$store.state.profile._id
      }
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  methods: {
    saveProfile() {
      this.$store
        .dispatch("edit", {
          data: this.profileSettings,
          _id: this.$store.state.profile._id,
          address: "profiles",
          commit: "setItem",
          commitAdress: "profile"
        })
        .then(res => {
          setTimeout(() => {
            this.$store.dispatch("getOneByAnother", {
              data: { _id: this.$store.state.user._id },
              commit: "setItem",
              commitAddress: "profile",
              address1: "account",
              address2: "profiles"
            });
          }, 1000);
        });
      // TODO commit data returned from edit instead of another get
    }
  },
  // function timeFunction() {
  //  setTimeout(function(){ alert("After 5 seconds!"); }, 5000);
  components: {
    Widget_User
  }
};
</script>

<style>
.bg-profile {
  background-color: mediumseagreen;
  background-size: cover;
}

.view-profile {
  height: 100vh;
  width: 100vw;
}

.box {
  border: 1rem solid rgb(88, 67, 67);
}
</style>

