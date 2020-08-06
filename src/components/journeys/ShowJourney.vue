<template>
    <div class="showjourney container">
        <div class="row mt-2">
            <div v-if="journey" class="col-md-3 d-md-block">
                <h5 class="ml-2">Journey - {{journey.title}}</h5>
                <ul class="list-group">
                    <li class="list-group-item">
                        <strong>Location:</strong>
                        {{ journey.location }}
                    </li>
                    <li class="list-group-item">
                        <strong>Visted:</strong>
                        {{ journey.visitedAt | customizedFromNow }}
                    </li>
                </ul>

                <GMap class="mt-2" />
            </div>

            <div v-if="journey" class="col-md-9">
                <img :src="journey.image" :alt="journey.title" class="card-img-top" />
                <div class="card-body">
                    <h4 class="card-title">{{journey.title}}</h4>
                    <p class="card-text">{{journey.description}}</p>
                    <hr />
                    <p class="card-text">
                        <small>SUBMITTED BY {{ journey.author || 'anonymous'}}, {{ journey.createdAt | customizedFromNow }}</small>
                    </p>
                    <router-link
                        v-if="owner"
                        :to="{ name: 'EditJourney', params: {journey_slug:journey.slug }}"
                        class="btn btn-warning btn-sm"
                    >edit</router-link>
                    <a v-if="owner" @click="deleteJourney" class="btn btn-danger btn-sm">delete</a>
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

export default {
    name: "ShowJourney",
    components: {
        AddComments,
        GMap,
    },
    data() {
        return {
            journey: null,
            owner: false,
            slug: this.$route.params.journey_slug,
        };
    },
    methods: {
        ...mapActions(["getSingleJourney"]),
        deleteJourney() {
            if (confirm("Are you sure to delete this")) {
                db.collection("journeys").doc(this.journey.id).delete();
                this.$router.push({ name: "Index" });
            } else {
                console.log("this is from showpage: thanks for not delete me");
            }
        },
        checkAuth(journey) {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    if (user.uid == journey.author_id) {
                        this.owner = true;
                    } else {
                        this.owner = false;
                    }
                } else {
                    this.owner = false;
                }
            });
        },
    },
    created() {
        this.getSingleJourney(this.slug);
    },
    computed: mapGetters(["singleJourney"]),
    watch: {
        singleJourney(newVal) {
            this.journey = newVal;
            this.checkAuth(newVal);
        },
    },
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