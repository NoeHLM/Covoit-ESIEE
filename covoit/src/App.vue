<template>
  <NavbarHeader/>
  <div class="app">
    <router-view /> 
    
  </div>
</template>

<script setup>
import NavbarHeader from './components/NavbarHeader.vue';

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
