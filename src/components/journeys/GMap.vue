<template>
    <div class="map">
        <div class="google-map" id="map">
            <h2>map</h2>
        </div>
    </div>   
</template>

<script>
export default {
    name: 'GMap',
    data(){
        return {
            lat: 53,
            lng:-2
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
        this.renderMap()
    }
}
</script>

<style>
.map .google-map {
    width: 100%;
    height: 400px;
}
</style>