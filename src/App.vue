<template>
  <div id="app">
    <b-container >
      <b-card class="text-center card-container">
        <!-- <b-card-header>
          <h1>TEST</h1>
        </b-card-header> -->
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
  components: {
  },
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
  min-height : 700px;
}
</style>
