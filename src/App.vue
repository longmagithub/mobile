<template>
  <div id="app">
    <!--
    <img src="./assets/logo.png">
    <router-view></router-view>
    -->
    <tabs></tabs>
  </div>
</template>

<script>
  import tabs from 'components/tabs.vue'
export default {
    name: 'app',
    components: {
      tabs
    }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
body{
  margin: 0;
  padding: 0;
}
@import './assets/common.css'
</style>
