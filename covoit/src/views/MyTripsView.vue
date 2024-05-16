<template>
    <div class="My-trips-Page">
        <img src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png" alt="">
        <p class="advice">Nous vous conseillons de créer un groupe Whatsapp et ensuite d'organiser un covoiturage sur les applications comme BlablaCar</p>
        <div class="My-trips-Group">
            <div class="My-trips-Card" v-for="trip in trips" :key="trip._id">
                <p>Départ : {{ trip.departureAdress }}</p>
                <p>Arrivée : {{ trip.destinationAdress }}</p>
                <div class="TimeHour">
                    <p>Date : {{ formatDate(trip.date) }}</p>
                    <p>{{ trip.time }}</p>
                </div>
                <p>Conducteur : {{ trip.driverNamePhone.firstname }} , {{ trip.driverNamePhone.phone }}</p>
                <p>Passagers :</p>
                <div v-for="passenger in trip.passengersInfo" :key="passenger._id">
                    <p>{{ passenger.firstname }} , {{ passenger.phone }}</p>
                </div>
                <button @click.prevent="onSubmitCancel(trip._id)">Se désinscrire</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useUser } from '@/utils/useUser';

export default {
    name: "MyTripsView",
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
    watch: {
        user: {
            immediate: true,
            handler(newValue) {
                if (newValue !== null && newValue !== undefined) {
                    this.getTripsByUser();
                }
            }
        }
    },
    methods: {
        async getTripsByUser() {
            try {
                const userId = this.user._id;
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/trips/getTripsByUser/${userId}`);
                const data = await response.json();

                const tripsWithDetails = await Promise.all(data.map(async (trip) => {
                    const driverNamePhone = await this.getDriverName(trip.driver);
                    const passengersInfo = await Promise.all(trip.participants.map(async (passengerId) => {
                        return await this.getPassengerName(passengerId);
                    }));
                    return {
                        ...trip,
                        date: new Date(trip.date).toLocaleDateString(),
                        driverNamePhone,
                        passengersInfo
                    };
                }));

                this.trips = tripsWithDetails;
            } catch (error) {
                console.error(error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        },
        async getDriverName(driverId) {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/getUserName/${driverId}`);
                const userData = await response.json();
                return userData;
            } catch (error) {
                console.error(error);
                return { firstname: "Nom inconnu", phone: "N/A" };
            }
        },
        async getPassengerName(passengerId) {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/users/getUserNameAndPhone/${passengerId}`);
                const userData = await response.json();
                return userData;
            } catch (error) {
                console.error(error);
                return { firstname: "Nom inconnu", phone: "N/A" };
            }
        },
        async onSubmitCancel(tripId) {
            try {
                const response = await fetch(`${process.env.VUE_APP_API_ADDRESS}/trips/cancelParticipation/${tripId}`, {
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
                    this.getTripsByUser();  
                } else {
                    const errorData = await response.json();
                    this.errorMessage = errorData.message;
                    alert(this.errorMessage);
                }
            } catch (error) {
                console.error(error);
                alert("Une erreur s'est produite lors de la désinscription.");
            }
        },
    }
};
</script>

<style lang="scss">
.My-trips-Page {
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
        font-size: 1.3rem;
        margin: 0;
        padding-top: 100px;
        text-shadow: 0 0 10px black;
        text-align: center;
    }
    .My-trips-Group {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-around;
        width: 100%;
        
        .My-trips-Card {
            background-color: #00000070;
            width: 40%;
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
            padding: 20px;
            border-radius: 10px;
            margin-top: 80px;
            height: 20%;

            .TimeHour {
                display: flex;
                flex-direction: row;
                gap: 10px;
            }
            p {
                margin: 0;
                font-size: 1rem;
                color: white;
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
