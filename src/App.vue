<template>
  <div id="app">
    <b-container class="main-container">
      <b-card bg-variant="white" class="text-center card-container">
        <nav class="nav-container">
          <b-breadcrumb :items="$route.meta.breadCrumb" :disabled="true"></b-breadcrumb>
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
.nav-container {
color: blue
}

  .breadcrumb {
    background-color: whitesmoke !important;
  }

.hasErrors {
  border-color: red !important;
}
</style>
