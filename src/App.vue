<template>
  <div id="app">
    <b-container>
      <nav>
        <b-breadcrumb :items="$route.meta.breadCrumb" :disabled="true"></b-breadcrumb>
      </nav>

      <b-card class="text-center">
        <b-card-body>
          <main>
            <router-view />
          </main>
        </b-card-body>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.card-container {
  min-height: 700px;
}

.hasErrors {
  border-color: red !important;
}
</style>
