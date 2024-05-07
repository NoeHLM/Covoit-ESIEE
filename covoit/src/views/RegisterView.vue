<template>
    <div class="Register-Page">
        <img src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png"
            alt="">
        <div class="div-form-signup">
            <form class="form-signup" @submit.prevent="onSubmitRegister">
                <h1>Inscription</h1>
                <div class="input-group">
                    <input v-model="formSignup.userLastname" type="text" placeholder="Nom">
                    <input v-model="formSignup.userFirstname" type="text" placeholder="Prénom">
                    <input v-model="formSignup.userPhone" type="tel" placeholder="Numéro de téléphone (06 XX XX XX XX)">
                    <input v-model="formSignup.userPassword" type="password" placeholder="Mot de passe">
                    <input v-model="formSignup.userConfirmPassword" type="password" placeholder="Confirmer mot de passe">
                    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                    <button>S'inscrire</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default ({
    name: "RegisterView",
    data() {
        return {
            formSignup: {
                userLastname: "",
                userFirstname: "",
                userPhone: "",
                userPassword: "",
                userConfirmPassword: ""
            },
            errorMessage: "",
            successMessage: ""
        }
    },
    methods: {
        async onSubmitRegister() {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/register`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.formSignup)
                });
                if (response.ok) {
                    console.log("Utilisateur inscrit avec succès !");
                    this.errorMessage = null;
                    this.successMessage = "Inscription réussie ! Nous vous avons envoyer un email de confirmation.";
                } else {
                    const errorData = await response.json();
                    this.errorMessage = errorData.message
                    console.error("Erreur lors de l'inscription :", response.statusText);
                }
            } catch (error) {
                console.error("Erreur lors de la requête :", error);
            }
        }
    }
})
</script>

<style lang="scss">
.Register-Page {
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        filter: blur(5px);
        z-index: -1;
    }

    .div-form-signup {
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
                .success-message {
                    color: green;
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
</style>