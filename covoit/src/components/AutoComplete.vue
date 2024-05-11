<template>
    <input ref="autocompleteInput" type="text">
</template>

<script>
import { onMounted, ref, getCurrentInstance } from "vue";

export default {
    name: 'AutoComplete',
    setup() {
        const autocompleteInput = ref(null);
        const instance = getCurrentInstance();

        const emit = (event, ...args) => {
            instance && instance.emit(event, ...args);
        };

        const link =
            "https://maps.googleapis.com/maps/api/js?key=AIzaSyDpyuWHqZxiuzV2iGNu9AMNIq34YkqAulo&libraries=places";

        onMounted(() => {
            const script = document.createElement('script');
            script.src = link;
            script.async = true;

            script.onload = () => {
                const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput.value);

                autocomplete.addListener("place_changed", () => {
                    const place = autocomplete.getPlace();
                    console.log("Place changed :", place);
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
