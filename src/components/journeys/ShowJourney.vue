<template>
    <div class="showjourney container">
        <div class="row mt-2">
            <div class="col-md-3 d-none d-md-block">
                <Weather :location='journey.location' class="mt-2" @clickWeather="getGeo"/>
                <GMap :geoPosition='geoPosition' class="mt-2" />
            </div>

            <div v-if="journey" class="col-md-9">
                <img :src="journey.image" class="card-img-top">
                <div class="card-body">
                    <h4 class="card-title">{{journey.title}}</h4>
                    <p class="card-text">{{journey.description}}</p>
                    <hr>
                    <p class="card-text"><small>SUBMITTED BY {{ journey.author || 'anonymous'}}, {{ journey.moment }} </small></p>
                    <router-link v-if="owner" :to="{ name: 'EditJourney', params: journey.slug }" class="btn btn-warning btn-sm">edit</router-link>
                    <a v-if="owner" @click="deleteJourney" class="btn btn-danger btn-sm">delete</a>
                    <!-- <div class="delete">xx</div> -->
                </div>
                <AddComments />
            </div>
            
        </div>


    </div>
</template>

<script>
import db from '@/firebase/init'
import firebase from 'firebase'
import moment from 'moment'
import AddComments from '@/components/comments/AddComments.vue'
import GMap from '@/components/journeys/GMap.vue'
import Weather from '@/components/journeys/Weather.vue'


export default {
    name: 'ShowJourney',
    components: {
        AddComments,
        GMap,
        Weather
    },
    data(){
        return {
            journey: [],
            owner: false,
            geoPosition:null
        }
    },
    methods: {
        deleteJourney(){
            if(confirm('Are you sure to delete this')){
                db.collection('journeys').doc(this.journey.id).delete();
                this.$router.push({ name: 'Index' });
            } else {
                console.log('this is from showpage: thanks for not delete me')
            }
        },
        getGeo(value){
            console.log(value);
            this.geoPosition = value;

        }
    },
    created(){
        let ref = db.collection('journeys')
        ref.where('slug', '==', this.$route.params.journey_slug).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                this.journey = doc.data();
                this.journey.id = doc.id;
                this.journey.moment = moment(this.journey.createdAt).fromNow();
                this.journey.user_uid = doc.data().user_uid;
                this.journey.author = doc.data().author;
            })
            firebase.auth().onAuthStateChanged(user => {
                if(user){
                    if(user.uid == this.journey.author_id){
                        this.owner = true           
                    } else {
                        this.owner = false
                    }
                } else {
                    this.owner = false;
                }

            })
        })
    }
}
</script>

<style>


.showjourney .btn {
    display: inline-block;
    width: 50px;
    padding: 2px;
    margin: 0 5px;
}

.showjourney .card-body {
    padding-left: 0;
}

/* .showjourney .delete {
    background-image: url(../../assets/icons/delete.svg) no-repeat 100%;
    width: 100%;

} */
</style>