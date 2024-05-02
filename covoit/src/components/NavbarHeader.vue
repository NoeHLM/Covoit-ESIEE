<template>
  <header class="navbar">
    <h1>COVOITURAGE</h1>
    <div class="navbar--a">
      <a href="/register">Inscription</a>
      <a href="/login">Connexion</a>
    </div>
  </header>
</template>

<script>
export default {
  name: 'NavbarHeader',
}
</script>

<style lang="scss">
.navbar {
  background-color: #00000029;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  position: fixed;
  z-index: 1000;
  padding: 20px 50px;
  align-items: center;
  justify-content: space-between;
  h1{
    margin: 0;
    font-size: 1.5rem;
    color: white;
  }
  .navbar--a {
    margin-right: 5%;
    a {
      color: white;
      text-decoration: none;
      margin-right: 20px;
      font-size: 1.2rem;
    }
    a:hover {
    color: #f1f1f1;
  }
  }
 
  @media screen and (max-width: 768px){
    
      padding: 5px 20px; 

      h1 {
        font-size: 1.5rem;
      }
    
    .navbar--a {
      margin-right: 10%; 
      a {
        margin-right: 10px; 
      }
    }
  }
}
</style>