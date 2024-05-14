<template>
    <div class="My-trips-Page">
        <img src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png"
            alt="">
        <div class="My-trips-Group">
            <div class="My-trips-Card" v-for="trip in trips" :key="trip._id">
                <p>Départ : {{ trip.departureAdress }}</p>
                <p>Arrivée : {{ trip.destinationAdress }}</p>
                <div class="TimeHour">
                    <p>Date : {{ formatDate(trip.date) }}</p>
                    <p>{{ trip.time }}</p>
                </div>
                <p>Conducteur : {{ trip.driverName }}</p>
                <p>Passagers :</p>
                <ul>
                    <li v-for="passenger in trip.passengers" :key="passenger._id">
                        {{ passenger.firstname }} - {{ passenger.phone }}
                    </li>
                </ul>
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
                console.log(data);
                this.trips = data;
            } catch (error) {
                console.error(error);
            }
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString();
        }
    }
}
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
    .My-trips-Group {
        display: flex;
        flex-direction: column;
        width: 45%;
        height: 100vh;
        

        .My-trips-Card {
            background-color: #00000070;
            width: 80%;
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
            padding: 20px;
            border-radius: 10px;
            margin-top: 30px;

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
        }
    }

}
</style>