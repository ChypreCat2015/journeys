<template>
    <div   v-if="weather" id="weather">
        <button @click="emitGeoPosition">Show me Location</button>
        <div class="card shadow-lg rounded">
            <img v-if="weather.IsDayTime" src="../../assets/weather/day.svg" alt="" class="time card-img-top">
            <img v-else src="../../assets/weather/night.svg" alt="" class="time card-img-top">
            <div class="icon bg-light mx-auto text-center">
                <img :src="require(`../../assets/weather/icons/${weather.WeatherIcon}.svg`)" alt="">
            </div>

            <div class="text-muted text-uppercase text-center details">
                <h5 class="my-3">{{ location }}</h5>
                <div class="my-3">{{ weather.WeatherText }}</div>
                <div class="display-4 my-4">
                    <span>{{ weather.Temperature.Metric.Value}}</span>
                    <span>&deg;C</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '@/eventBus.js'

export default {
    name: 'Weather',
    props: ['location'],
    data(){
        return {
            key: 'W2f4l7Y4E2vgZYpyHJ8Dc1PIfsw3Xy9X',
            weather:null,
            geoPosition:[]
        }
    },
    //TRY WATCH, when the newVal available, that is vue loaded the props from parent page
    watch: {
        location(newVal){
            this.updateCity(newVal)
            }         
    },
    methods: {
            // TRY ASYNC WITH AXIOS
        async getCity(city){
            const key = this.key;
            const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
            const query = `?apikey=${key}&q=${city}`;
            const res = await axios.get(base + query);
            if(res.data[0] === undefined){
                console.log('Invalid city')
            } else {
                city = res.data[0]
                this.geoPosition.lat = city.GeoPosition.Latitude;
                this.geoPosition.lng = city.GeoPosition.Longitude;
                return city.Key
            }      
         },
         async getWeather(cityId){
             const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
             const query = `${cityId}?apikey=${this.key}`;
             const res = await axios.get(base + query);
             const weather = res.data[0];
             console.log(weather)
             return weather
         },
         async updateCity(city){
             console.log(this.location);
             const cityId = await this.getCity(city);
             if(cityId === undefined) {
                 console.log("let's stop it")
             } else {
                const weather = await this.getWeather(cityId);
                this.weather = weather;
             }
         },
         emitGeoPosition(){
             EventBus.$emit('geoPosition', this.geoPosition);
         }
    }
}
</script>

<style>
#weather {
    letter-spacing: 0.2em;
    font-size: 0.8em;
}
#weather .card .icon{
    position: relative;
    top: -50px;
    border-radius: 50%;
    width: 100px;
    margin-bottom: -50px;
}

#weather .card {
    animation: fade-in;
    animation-duration: 1s;
}

@keyframes fade-in {
    0% {opacity: 0;}
    40% {opacity: 0.5;}
    100%{opacity:1;}
}

</style>