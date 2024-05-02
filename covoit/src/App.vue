<template>
  <div id="app">
    <NavbarHeader />
    <div class="content">
      <router-view /> 
    </div>
  </div>
</template>


<script >
  import NavbarHeader from './components/NavbarHeader.vue';
  export default {
    name: 'App',
    components: {
      NavbarHeader
    }
  }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');
body {
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Roboto', sans-serif;
  width: 100%;
}



</style>
