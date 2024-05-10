<template>
    <input ref="autocompleteInput" type="text" :placeholder="placeholderText">
</template>

<script>
import { onMounted, ref } from "vue";

export default {
    name: 'Autocomplete',
    props: {
        placeholderText: {
            type: String,
            default: "Entrez une adresse"
        }
    },
    setup(props, { emit }) {
        const autocompleteInput = ref(null);
        const link =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpyuWHqZxiuzV2iGNu9AMNIq34YkqAulo&libraries=places";

        onMounted(() => {
            const script = document.createElement("script");
            script.src = link;
            script.async = true;

            script.onload = () => {
                const autocomplete = new google.maps.places.Autocomplete(
                    autocompleteInput.value
                );
                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    emit("placeChanged", place);
                });
            };

            script.onerror = () => {
                console.error("Erreur lors du chargement de l'API Google Maps");
            };

            document.head.appendChild(script);
        });

        return {
            autocompleteInput
        };
    }
};
</script>