<template>
    <div class="Research-Page">
        <img src="https://www.hautsdefrance.fr/app/uploads/2022/06/220504_PassPass_DefiCovoiturage_Visuel_Voiture-750x375-1654607924.png"
            alt="">
        <div class="Research-Group">
            <form>
                <div class="ResearchCard" v-for="trip in trips" :key="trip._id">
                    <p> Départ : {{ trip.departureAdress }}</p>
                    <p> Arrivée : {{ trip.destinationAdress }}</p>
                    <div class="TimeHour">
                        <p> Date : {{ trip.date }}</p>
                        <p>{{ trip.time }}</p>
                    </div>
                    <p>{{ trip.maxPlaces }} places restantes</p>
                    <p>{{ getDriverName(trip.driver) }}</p>
                    <button>Rejoindre</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: "ResearchView",
    data() {
        return {
            trips: []
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
                this.trips = data.map(trip => ({
                    ...trip,
                    date: new Date(trip.date).toLocaleDateString()
                }));
                console.log(this.trips);
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

    .Research-Group {
        display: flex;
        flex-direction: column;
        width: 45%;
        height: 100vh;


        .ResearchCard {
            background-color: #00000070;
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            gap: 10px;
            padding: 20px;
            border-radius: 10px;
            justify-content: start;
            margin-top: 80px;

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