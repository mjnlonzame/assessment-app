<template>
  <div id="app">
    <b-container class="main-container">
      <b-card bg-variant="white" class="text-center card-container">
        <nav class="nav-container">
          <b-breadcrumb :items="$route.meta.breadCrumb" :disabled="true"></b-breadcrumb>
          <!-- <a class="float-right logout-btn">Logout</a> -->
          <a @click="onLogoutClick" :hidden="hideLogoutbutton" class="logout-btn">Logout</a>
        </nav>
        <main>
          <b-card-body>
            <router-view />
          </b-card-body>
        </main>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  computed: {
    hideLogoutbutton() {
      return (
        this.$route.name === 'LoginAccount'
        || (this.$route.name === 'HomePage' && !this.$session.exists())
      );
    },
  },
  methods: {
    onLogoutClick() {
      this.$session.destroy();
      this.$router.push({
        name: 'LoginAccount',
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .nav-container {
  color: blue;
} */

.breadcrumb {
  background-color: #fce0d4 !important;
}

.hasErrors {
  border-color: red !important;
}

body {
  background-image: url("./assets/bg.jpeg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  opacity: 0.95;
}

.logout-btn {
  position: absolute;
  padding: 2em;
  left: 94.5%;
  top: 0%;
  transform: translateX(-50%);
  color: #6c757d;
}
</style>
