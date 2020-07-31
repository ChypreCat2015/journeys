<template>
    <div class="showjourney container">
        <div class="row mt-2">
            <div class="col-md-3 d-none d-md-block">
                <!-- <Weather :location="journey.location" class="mt-2" @clickWeather="getGeo" /> -->
                <GMap class="mt-2" />

                <div class="card">
                    <img src class="card-img-top" />

                    <div class="card-body">
                        <h5 class="card-title">{{ singleJourney.author }}</h5>
                        <p>
                            <span class="online"></span>online
                        </p>
                        <p>
                            <span class="offline"></span>offline
                        </p>
                    </div>
                </div>
            </div>

            <div v-if="singleJourney" class="col-md-9">
                <img :src="singleJourney.image" :alt="singleJourney.title" class="card-img-top" />
                <div class="card-body">
                    <h4 class="card-title">{{singleJourney.title}}</h4>
                    <p class="card-text">{{singleJourney.description}}</p>
                    <hr />
                    <p class="card-text">
                        <small>SUBMITTED BY {{ singleJourney.author || 'anonymous'}}, {{ singleJourney.createdAt | customizedFromNow }}</small>
                    </p>
                    <router-link
                        v-if="owner"
                        :to="{ name: 'EditJourney', params: singleJourney.slug }"
                        class="btn btn-warning btn-sm"
                    >edit</router-link>
                    <a v-if="owner" @click="deleteJourney" class="btn btn-danger btn-sm">delete</a>
                    <!-- <div class="delete">xx</div> -->
                </div>
                <AddComments />
            </div>
        </div>
    </div>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";
import AddComments from "@/components/comments/AddComments.vue";
import { mapGetters, mapActions } from "vuex";
import GMap from "@/components/journeys/GMap.vue";
// import Weather from "@/components/journeys/Weather.vue";

export default {
    name: "ShowJourney",
    components: {
        AddComments,
        GMap,
    },
    data() {
        return {
            owner: false,
            slug: this.$route.params.journey_slug,
        };
    },
    methods: {
        ...mapActions(["getSingleJourney"]),
        deleteJourney() {
            if (confirm("Are you sure to delete this")) {
                db.collection("journeys").doc(this.singleJourney.id).delete();
                this.$router.push({ name: "Index" });
            } else {
                console.log("this is from showpage: thanks for not delete me");
            }
        },
    },
    created() {
        this.getSingleJourney(this.slug);

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if (user.uid == this.singleJourney.author_id) {
                    this.owner = true;
                } else {
                    this.owner = false;
                }
            } else {
                this.owner = false;
            }
        });
    },
    computed: mapGetters(["singleJourney"]),
};
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

.showjourney {
    margin-bottom: 30px;
}
/* 
.showjourney .card-body span {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: pink;
    border: 1px solid orange;
} */
</style>