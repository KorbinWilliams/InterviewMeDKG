<template>
  <div class="container-fluid" id="home">
    <div class="row">
      <div class="col">
        <Widget_User />
      </div>
    </div>
    <div class="row title">
      <div class="col text-center mt-5">
        <h2>Lets get Employed</h2>
      </div>
    </div>
    <div class="container mt-5" id="contain-cards">
      <div class="row align-items-center">
        <div class="col-sm-12 col-md-4" id="quizzes">
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
        <div class="col-sm-12 col-md-4 mb-3 mt-3" id="text-interview">
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
        <div class="col-sm-12 col-md-4" id="third">
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
h2 {
  color: white;
  text-shadow: 1px 1px;
}
#home {
  background-image: url("https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80");
  background-size: cover;
  min-height: 100vh;
}
.title {
  min-height: 25vh;
}

#comingSoon {
  background-color: grey;
}

.card-block {
  padding: 10px 10px 10px 10px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
}
.card {
  transition: transform 0.2s;
}
.card:hover {
  -ms-transform: scale(1.1);
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
