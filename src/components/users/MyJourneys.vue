<template>
    <div class="myjourneys container">
        <!-- <div v-for="(myjourney,index) in myjourneys" :key="index" class="content mt-3">
            <div class="header">
                <h6 class="title py-2 pl-2">
                    <router-link :to="{ name: 'ShowJourney', params:{ journey_slug: myjourney.slug }}" class="text-white">{{ myjourney.title}}</router-link>
                </h6>
                <span class="date">{{ myjourney.createdAt }}</span>
            </div>
            <div class="body">
                <img :src="myjourney.image">
                <span>{{ myjourney.description }}</span>
            </div>        
        </div> -->

        <div v-if="checkEmypty">
            <h5 class="text-center text-monospace">
                You don't have any journeys yet, go
                <router-link :to="{ name: 'AddJourney' }" class="font-italic"
                    >create</router-link
                >
                some new ones!
            </h5>
        </div>

        <div
            v-for="(myjourney, index) in orderMyjourneys"
            :key="index"
            class="content mt-3"
        >
            <div class="header">
                <h6 class="title py-2 pl-2">
                    <router-link
                        :to="{
                            name: 'ShowJourney',
                            params: { journey_slug: myjourney.slug },
                        }"
                        class="text-white"
                        >{{ myjourney.title }}</router-link
                    >
                </h6>
                <span class="date">{{ myjourney.createdAt | dateFormat }}</span>
            </div>
            <div class="body">
                <img :src="myjourney.image" />
                <span>{{ myjourney.description }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from "firebase";
import db from "@/firebase/init";

export default {
    name: "MyJourney",
    data() {
        return {
            myjourneys: [],
            checkEmypty: false,
        };
    },
    watch: {
        checkEmypty: function () {
            if (this.myjourneys.length == 0) {
                this.checkEmypty = true;
            } else {
                this.checkEmypty = false;
            }
        },
    },
    computed: {
        orderMyjourneys: function () {
            let test = this.myjourneys;
            return test.sort((a, b) => b.createdAt - a.createdAt);
        },
    },
    created() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                db.firestore()
                    .collection("journeys")
                    .where("author_id", "==", user.uid)
                    .get()
                    .then((snapshot) => {
                        snapshot.forEach((doc) => {
                            let myjourney = doc.data();
                            this.myjourneys.push(myjourney);
                        });
                    });
            }
        });
    },
};
</script>

<style>
.myjourneys {
    margin-top: 50px;
}

.myjourneys .header .title {
    margin: 0;
    background-color: #9fb6cd;
}

.myjourneys .header .date {
    color: gray;
    font-size: 0.8em;
    display: inline-block;
}

.myjourneys .body {
    display: flex;
}

.myjourneys .body span {
    font-size: 0.8em;
    margin-left: 10px;
}

.myjourneys .body img {
    width: 25%;
    height: 25%;
    border-radius: 2px;
}
</style>