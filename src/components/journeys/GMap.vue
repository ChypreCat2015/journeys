<template>
    <div class="map">
        <div class="google-map" id="map">

        </div>
    </div>   
</template>

<script>
import { EventBus } from '@/eventBus.js'

export default {
    name: 'GMap',
    data(){
        return {
            lat: null,
            lng: null
        }
    },
    methods: {
        renderMap(){
            const google = window.google
            const map = new google.maps.Map(document.getElementById('map'), {
                center:{lat: this.lat, lng: this.lng},
                zoom: 10,
                maxZoom: 15,
                minZoom: 3,
                streetViewControl: false 
            })
            return map
        }
    },
    mounted(){
       //this.renderMap()
    },
    created(){
        EventBus.$on('geoPosition', (value) => {
            //get value from weather component 
            this.lat = value.lat;
            this.lng = value.lng;
            this.renderMap();
        })
    }
}
</script>

<style>
.map .google-map {
    width: 100%;
    height: 400px;
}
</style>