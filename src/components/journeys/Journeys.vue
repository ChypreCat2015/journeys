<template>
    <div class="journeys">
        <header class="jumbotron">
            <div class="container">
                <h1 class="display-4">Welcome to My Wonderful Journeys!</h1>
                <p class="lead">View places I've been to</p>
                <!-- make the button it's own paragragh -->
                <p>
                        <router-link :to="{ name: 'AddJourney' }" class="btn btn-lg">Add New Journey</router-link>
                </p>
            </div>
        </header>

        <div class="container">
            <div class="row">
                <div v-for="(journey, index) in journeys" :key="index" class="col-md-3 col-sm-6 card-group">
                    <div id="indexcard" class="card mt-3"> 
                        <img :src="journey.image" class="card-img-top">
                        <div class="card-body d-flex flex-column">
                            <span class="card-title">{{ journey.title }}</span>
                            <small class="card-text text-muted">{{ journey.description.substring(0,80) }}</small>
                            <div class="mt-auto">
                                <router-link :to="{ name: 'ShowJourney', params: {journey_slug:journey.slug} }" class="btn btn-sm">More Info</router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import db from '@/firebase/init'

export default {
    name: 'Journeys',
    data(){
        return {
            journeys: []
        }
    },
    methods: {

    },
    created(){
        db.collection('journeys').orderBy('createdAt', 'desc').get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let journey = doc.data();
                journey.id = doc.id;
                // journey.title = doc.data().title;
                // journey.description = doc.data().description;
                // journey.image = doc.data().image;
                // journey.slug = doc.data().slug;
                this.journeys.push(journey);
            })
        })

    }
}
</script>

<style scoped>
.journeys .btn{
    color: rgb(128, 153, 179);
    border: 1px solid rgb(128, 153, 179);
}
.journeys .btn:hover {
    background-color: rgb(128, 153, 179);
    color:white;
}
</style>