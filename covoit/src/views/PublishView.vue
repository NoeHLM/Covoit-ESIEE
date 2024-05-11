<template>
    <div class="Publish-Page">
        <img src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png"
            alt="">
        <div class="Publish-Form">
            <form class="form-publish" @submit.prevent="onSubmitPublish">
                <h1>Publier un trajet</h1>
                <div class="input-group">
                    <AutoComplete v-model="formPublish.departure" placeholderText="Départ" @placeChanged="handlePlaceChanged" />
                    <select v-model="formPublish.arrival" class="select-style">
                        <option disabled value="">Adresse d'arrivée</option>
                        <option v-for="trip in adminTrips" :key="trip._id" :value="trip.departureAdress">{{
                            trip.departureAdress }}</option>
                    </select>
                    <input v-model="formPublish.date" type="date" placeholder="Date">
                    <input v-model="formPublish.time" type="time" placeholder="Heure">
                    <input v-model="formPublish.maxPlaces" type="number" placeholder="Nombre de places">
                    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
                    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
                    <button>Publier</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import AutoComplete from '@/components/AutoComplete.vue';
import { useUser } from '@/utils/useUser';

export default {
    name: "PublishTrip",
    components: {
        AutoComplete
    },
    setup() {
        const { user } = useUser();
        console.log("User :", user);

        const formPublish = {
            User_id: "",
            departure: "",
            arrival: "",
            date: "",
            time: "",
            maxPlaces: "",
            
        };

        return {
            user,
            formPublish
        };
    },
    data() {

        return {
            adminTrips: [],
            errorMessage: "",
            successMessage: ""
        };
    },
    mounted() {
        this.getAdminTrips();
    },
    methods: {
        handlePlaceChanged(place) {
            this.formPublish.departure = place.formatted_address;
        },
        async getAdminTrips() {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/admin/get`);
                if (response.ok) {
                    const trips = await response.json();
                    this.adminTrips = trips;
                } else {
                    console.error("Erreur lors de la récupération des trajets :", response.statusText);
                }
            } catch (error) {
                console.error("Erreur lors de la requête :", error);
            }
        },
        async onSubmitPublish() {
            try {
                this.formPublish.User_id = this.user._id;

                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/trips/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.formPublish)
                });
                if (response.ok) {
                    console.log("Trajet publié avec succès !");
                    this.errorMessage = null;
                    this.successMessage = "Trajet publié avec succès !";
                } else {
                    const errorData = await response.json();
                    this.errorMessage = errorData.message;
                    console.error("Erreur lors de la publication du trajet :", response.statusText);
                }
            } catch (error) {
                console.error("Erreur lors de la requête :", error);
            }
        }
    }
};
</script>

<style lang="scss">
.Publish-Page {
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        filter: blur(5px);
        z-index: -1;
    }

    .Publish-Form {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;

        .form-publish {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background-color: rgba(0, 0, 0, 0.8);
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 30%;
            color: white;

            h2 {
                margin-bottom: 20px;
            }

            .input-group {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;

                input {
                    color: white;
                    width: 80%;
                    padding: 13px;
                    border: 1px solid #000;
                    border-radius: 5px;
                    background-color: #333;

                    &::placeholder {
                        color: white;
                        opacity: 0.5;
                    }
                }

                .select-style {
                    color: white;
                    width: 85%;
                    padding: 10px;
                    border: 1px solid #000;
                    border-radius: 5px;
                    background-color: #333;
                    
                    cursor: pointer;

                    &::placeholder {
                        color: white;
                        opacity: 0.5;
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

                .error-message {
                    color: red;
                }

                .success-message {
                    color: green;
                }
            }
        }
    }
}
</style>
