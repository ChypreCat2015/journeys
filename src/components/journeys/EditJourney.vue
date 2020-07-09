<template>
    <div v-if="journey" id="editjourney" class="container">
        <h2 class="text-center mt-3">Edit Journey</h2>
        <form @submit.prevent="editJourney">
            <div class="form-group">
                <label for="title">Journey Title</label>
                <input type="text" class="form-control" name="title" v-model="journey.title" />
            </div>
            <div class="form-group">
                <label for="location">Location</label>
                <input type="text" class="form-control" name="location" v-model="journey.location" />
            </div>
            <div class="form-group">
                <label for="image">Image URL</label>
                <input type="text" class="form-control" name="image" v-model="journey.image" />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    rows="15"
                    name="des"
                    v-model="journey.description"
                ></textarea>
            </div>
            <div class="form-group">
                <p v-if="feedback">{{ feedback }}</p>
                <button class="btn btn-outline-info btn-block">SUBMIT</button>
                <router-link :to="{ name: 'Index' }">Go Back</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import db from "@/firebase/init";
import slugify from "slugify";
import { mapGetters } from "vuex";

export default {
    name: "EditJourney",
    data() {
        return {
            journey: null,
            feedback: null,
            slug: this.$route.params.journey_slug
        };
    },
    computed: mapGetters(["singleJourney"]),
    methods: {
        editJourney() {
            if (
                this.journey.title &&
                this.journey.location &&
                this.journey.image &&
                this.journey.description
            ) {
                this.feedback = null;
                //create slug
                this.journey.slug = slugify(this.journey.title, {
                    replacement: "-",
                    remove: /[$*_=~.()'"!\-:@]/g,
                    lower: true
                });
                db.collection("journeys")
                    .doc(this.journey.id)
                    .update({
                        title: this.journey.title,
                        location: this.journey.location,
                        image: this.journey.image,
                        description: this.journey.description,
                        slug: this.journey.slug
                    })
                    .then(() => {
                        this.$router.push({ name: "Index" });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            } else {
                this.feedback = "Please fill all the information";
            }
        }
    },
    created() {
        //getting data from state
        this.journey = this.singleJourney(this.slug);
    }
};
</script>

<style scoped>
h2 {
    margin-top: 10px;
}
form {
    width: 60%;
    margin: 30px auto;
}
#addjourney label {
    font-size: 0.8em;
    color: gray;
}
</style>