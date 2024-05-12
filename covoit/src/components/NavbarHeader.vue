<template>
  <header class="navbar">
    <h1>CovoitEz</h1>
    <div class="navbar--a">
      <router-link v-if="isLoggedIn" to="/research">Rechercher</router-link>
      <router-link v-if="isLoggedIn" to="/publish">Publier</router-link>
      <router-link v-if="isLoggedIn && getRole() === 'admin'" to="/admin/create">Admin</router-link>
      <router-link v-if="isLoggedIn" to="/logout" >Deconnexion</router-link>
    </div>
  </header>
</template>

<script>
import { ref, watch } from 'vue';
import { useUser} from '@/utils/useUser';
import Cookies from 'js-cookie';

export default {
  name: 'NavbarHeader',
  setup() {
    const { user } = useUser();
    const isLoggedIn = ref(!!Cookies.get('isLoggedIn'));

    watch(() => Cookies.get('isLoggedIn'), (newValue) => {
      isLoggedIn.value = !!newValue;
    });
    return {
      user,
      isLoggedIn,
    };
  },
  methods: {
    getRole() {
      try {
        if (this.user && this.user.role === 'admin') {
          return 'admin';
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du role :', error);
      }
    }
  },
};
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

  h1 {
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

  @media screen and (max-width: 768px) {

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
