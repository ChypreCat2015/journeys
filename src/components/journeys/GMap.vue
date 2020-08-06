<template>
    <div id="map"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "GMap",
    data() {
        return {};
    },
    methods: {
        renderMap() {
            //initializ map
            const map = new window.google.maps.Map(
                document.getElementById("map"),
                {
                    zoom: 8,
                    center: { lat: -34.397, lng: 150.644 },
                }
            );
            return map;
        },
        geocoderAddress(resultsMap, location) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: location }, (results, status) => {
                if (status === "OK") {
                    resultsMap.setCenter(results[0].geometry.location);
                    new window.google.maps.Marker({
                        map: resultsMap,
                        position: results[0].geometry.location,
                        streetViewControl: false,
                    });
                } else {
                    console.log(
                        "geocode was not successful for the following reason" +
                            status
                    );
                }
            });
        },
    },
    computed: {
        ...mapGetters(["singleJourney"]),
    },
    mounted() {
        this.geocoderAddress(this.renderMap(), this.singleJourney.location);
    },
};
</script>

<style>
#map {
    width: 100%;
    height: 400px;
}
</style>