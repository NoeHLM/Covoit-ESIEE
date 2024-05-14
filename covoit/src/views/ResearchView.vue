<template>
    <div class="Research-Page">
        <img src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png" alt="">
        <p class="advice">En rejoignant un trajet, vous acceptez de partagez votre numéro de téléphone avec les autres participants</p>
        <div class="Research-Group">
            <form class="formResearch" @submit.prevent>
                <div class="ResearchCard" v-for="trip in trips" :key="trip._id">
                    <p>Départ : {{ trip.departureAdress }}</p>
                    <p>Arrivée : {{ trip.destinationAdress }}</p>
                    <div class="TimeHour">
                        <p>Date : {{ trip.date }}</p>
                        <p>{{ trip.time }}</p>
                    </div>
                    <p>{{ trip.maxPlaces }} places restantes</p>
                    <p>Conducteur : {{ trip.driverName }}</p>
                    <button @click.prevent="onSubmitResearch(trip._id)">Rejoindre</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { useUser } from '@/utils/useUser';

export default {
    name: "ResearchView",
    data() {
        return {
            trips: [],
            successMessage: '',
            errorMessage: ''
        };
    },
    setup() {
        const { user } = useUser();
        return {
            user
        };
    },
    mounted() {
        this.getTrips();
    },
    methods: {
        async getTrips() {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/trips/getNextTrips`);
                const data = await response.json();

                const tripsWithDriverNames = await Promise.all(data.map(async (trip) => {
                    const driverName = await this.getDriverName(trip.driver);
                    return {
                        ...trip,
                        date: new Date(trip.date).toLocaleDateString(),
                        driverName
                    };
                }));

                this.trips = tripsWithDriverNames;
            } catch (error) {
                console.error(error);
            }
        },
        async getDriverName(driverId) {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/getUserName/${driverId}`);
                const userData = await response.json();
                return userData.firstname;
            } catch (error) {
                console.error(error);
                return "Nom inconnu";
            }
        },
        async onSubmitResearch(tripId) {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/trips/participate/${tripId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId: this.user._id
                    })
                });
                if (response.ok) {
                    const successMessage = await response.json();
                    this.successMessage = successMessage.message;
                    alert(this.successMessage);  
                } else {
                    const errorData = await response.json();
                    this.errorMessage = errorData.message
                    alert(this.errorMessage);  
                }
            } catch (error) {
                console.error(error);
                alert("Une erreur s'est produite lors de la participation.");  
            }
        }
    }
};
</script>

<style lang="scss">
.Research-Page {

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        filter: blur(5px);
        z-index: -1;
    }
    .advice {
        color: white;
        font-size: 1rem;
        margin: 0;
        padding-top: 100px;
        text-shadow: 0 0 10px black;
        text-align: center;
    }
    .Research-Group {
        display: flex;
        flex-direction: column;
        width: 45%;
        height: 100vh;
        .ResearchCard {
            background-color: #00000070;
            width: 80%;
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;
            p {
                margin: 0;
                font-size: 1rem;
                color: white;
            }
            .TimeHour {
                display: flex;
                flex-direction: row;
                gap: 10px;
            }
        }
    }
}
</style>
