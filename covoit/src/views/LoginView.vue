<template>
  <div class="Login-Page">
    <img
      src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png"
      alt="">
    <div class="div-form-login">
      <form class="form-login" @submit.prevent="onSubmitLogin">
        <h1>Connexion</h1>
        <div class="input-group">
          <input v-model="formLogin.userPhone" type="tel" placeholder="Numéro de téléphone">
          <input v-model="formLogin.userPassword" type="password" placeholder="Mot de passe">
          <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
          <p class="no-account">Vous n'avez pas de compte ? <a href="/register">Inscrivez-vous</a></p>
          <button>Se connecter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { loginUser } from '@/utils/AuthContext';
import Cookies from 'js-cookie';

export default {
  name: "LoginView",
  data() {
    return {
      formLogin: {
        userPhone: "",
        userPassword: "",
      },
      errorMessage: "",
    };
  },
  methods: {
    async onSubmitLogin() {
      try {
        const { success, error } = await loginUser(
          this.formLogin
        );

        if (success) {
          console.log("Utilisateur connecté !");
          this.errorMessage = null;
          Cookies.set('isLoggedIn', true);
          window.location.reload();
        } else {
          this.errorMessage = error.data.message;
          console.error("Erreur lors de la connexion :", error.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la requête :", error);
      }
    },
  },
};
</script>


<style lang="scss">
.Login-Page {
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    filter: blur(5px);
    z-index: -1;
  }

  .div-form-login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

    form {
      background-color: rgba(0, 0, 0, 0.8);
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      width: 30%;

      h1 {
        text-align: center;
        margin-bottom: 30px;
        color: white;
      }

      .input-group {
        text-align: center;

        input {
          color: white;
          width: 80%;
          padding: 13px;
          margin-bottom: 20px;
          border: 1px solid #000;
          border-radius: 5px;
          background-color: #333;

          &:focus {
            outline: none;
            border: 1px solid rgb(333, 333, 333);
          }

          &::placeholder {
            color: white;
            opacity: 0.5;
          }
        }

        .error-message {
          color: red;
        }

        .no-account {
          color: white;

          a {
            font-weight: bold;
          }
        }

        button {
          width: 40%;
          padding: 10px;
          background-color: #252020;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background-color: #333;
          }
        }
      }
    }
  }
}
</style>