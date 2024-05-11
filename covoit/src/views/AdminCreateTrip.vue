<template>
    <div class="Create-Trip-Page">
        <img src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png"
            alt="">
        <button class="button-choice" @click="showSingleTripForm = true; showDailyTripForm = false">Trajet
            unique</button>
        <button class="button-choice" @click="showSingleTripForm = false; showDailyTripForm = true">Trajet
            quotidien</button>

        <div v-if="showSingleTripForm">
            <form class="form-choice" @submit.prevent="onSubmitSingleTrip">
                <h2>Trajet unique</h2>
                <div class="input-group">
                    <AutoComplete v-model="formSingleTrip.departure" placeholderText="Destination"
                        @placeChanged="handlePlaceChanged" />
                    <input v-model="formSingleTrip.date" type="date" placeholder="Date">
                    <button>Envoyer</button>
                </div>
            </form>
        </div>
        <div v-if="showDailyTripForm">
            <form class="form-choice" @submit.prevent="onSubmitDailyTrip">
                <h2>Trajet quotidien</h2>
                <div class="input-group">
                    <AutoComplete v-model="formDailyTrip.departure" placeholderText="Destination"
                        @placeChanged="handlePlaceChanged" />
                    <button>Envoyer</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import AutoComplete from '@/components/AutoComplete.vue';
export default {
    name: 'AdminCreateTrip',
    components: {
        AutoComplete
    },
    data() {
        return {
            showSingleTripForm: false,
            showDailyTripForm: false,
            formSingleTrip: {
                departure: "",
                date: "",
            },
            formDailyTrip: {
                departure: "",
            }
        };
    },
    methods: {
        handlePlaceChanged(place) {
            this.formSingleTrip.departure = place.formatted_address;
            this.formDailyTrip.departure = place.formatted_address;
        },
        async onSubmitSingleTrip() {
            console.log("Contenu de formSingleTrip :", this.formSingleTrip);
            this.formSingleTrip.type = "single";
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/admin/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(this.formSingleTrip),

                });
                if (response.ok) {
                    console.log("Trajet unique créé avec succès !");
                } else {
                    const errorData = await response.json();
                    console.error("Erreur lors de la création du trajet :", errorData.message);
                }
            } catch (error) {
                console.error("Erreur lors de la requête :", error);
            }
        },
        async onSubmitDailyTrip() {
            console.log("Contenu de formDailyTrip :", this.formDailyTrip);
            this.formDailyTrip.type = "daily";
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/admin/create`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(this.formDailyTrip)
                });
                if (response.ok) {
                    console.log("Trajet quotidien créé avec succès !");
                } else {
                    const errorData = await response.json();
                    console.error("Erreur lors de la création du trajet :", errorData.message);
                }
            } catch (error) {
                console.error("Erreur lors de la requête :", error);
            }
        }
    }

};
</script>

<style>
.Create-Trip-Page {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 20px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        filter: blur(5px);
        z-index: -1;
    }

    .button-choice {
        width: 10%;
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

    .form-choice {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.8);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 100%;
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