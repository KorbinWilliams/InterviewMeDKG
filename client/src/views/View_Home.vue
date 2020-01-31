<template>
  <div id="home">
    <div class="container-fluid">
      <div class="row">
        <div class="col">
          <Widget_User />
        </div>
      </div>
    </div>
    <div class="container mt-5">
      <div class="row align-items-center pt-5 mt-5">
        <div class="col-4">
          <div class="card" id="comingSoon">
            <div class="card-block">
              <h5 class="VSIP">Coming Soon</h5>
              <img
                src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                class="card-img"
                alt
              />
            </div>
          </div>
        </div>
        <div class="col-4">
          <router-link to="/text_lobbies">
            <div class="card">
              <div class="card-block">
                <h5>Text Interview</h5>
                <img
                  src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  class="card-img"
                  alt
                />
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-4">
          <router-link to="/quizzes">
            <div class="card">
              <div class="card-block">
                <h5>Quiz</h5>
                <img
                  src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                  class="card-img"
                  alt
                />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Widget_User from "../components/Widget_User";

export default {
  name: "View_Home",
  components: {
    Widget_User
  }
};
</script>

<style scoped>
#home {
  background-color: cornflowerblue;
}
.widget {
  width: 100%;
}
#comingSoon {
  background-color: grey;
}
.container {
  height: 100vh;
}
.card-block {
  padding: 10px 10px 10px 10px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
</style>
