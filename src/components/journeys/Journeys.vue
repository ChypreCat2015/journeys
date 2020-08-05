<template>
    <div class="journeys">
        <header class="jumbotron">
            <div class="container">
                <h1 class="display-4">Welcome to My Wonderful Journeys!</h1>
                <p class="lead">View places I've been to</p>
                <div class="search">
                    <router-link :to="{ name: 'AddJourney' }" class="btn btn-lg">Add New Journey</router-link>
                    <input
                        type="text"
                        v-model="search"
                        placeholder="Search Journeys Titles"
                        class="form-control"
                    />
                </div>
            </div>
        </header>

        <div class="container">
            <div class="row">
                <div
                    v-for="(journey, index) in filteredJourneys"
                    :key="index"
                    class="col-lg-3 col-md-6 card-group"
                >
                    <div id="indexcard" class="card mt-3">
                        <img :src="journey.image" alt="Journey image" class="card-img-top" />
                        <div class="card-body d-flex flex-row flex-wrap">
                            <span class="card-title">{{ journey.title }}</span>
                            <small
                                class="card-text text-muted w-100"
                            >{{ journey.description | snippet }}</small>
                            <div class="mt-3 more-info-link">
                                <router-link
                                    :to="{ name: 'ShowJourney', params: {journey_slug:journey.slug} }"
                                    class="btn btn-sm"
                                >More Info</router-link>
                            </div>
                            <div class="likes mt-3 text-right">
                                <span
                                    @click="clickedLike()"
                                    :disabled="hasLiked"
                                    class="mdi mdi-heart-outline"
                                ></span>
                                <small class="ml-2 text-muted">{{ journey.likes }}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Journeys",
    data() {
        return {
            search: "",
            hasLiked: false,
        };
    },
    methods: {
        ...mapActions(["getJourneys"]),
        clickedLike() {
            this.likeCounter++;
            let likeEl = document.querySelector(".mdi");
            likeEl.classList.remove("mdi-heart-outline");
            likeEl.classList.add("mdi-heart");
            this.hasLiked = true;
        },
    },
    created() {
        this.getJourneys();
    },
    computed: {
        //be carefull with the quote sign!!!
        ...mapGetters(["journeysList"]),
        filteredJourneys: function () {
            return this.journeysList.filter((journey) => {
                return journey.title
                    .toLowerCase()
                    .match(this.search.toLowerCase());
            });
        },
    },
};
</script>

<style>
.journeys h1.display-4 {
    font-family: "Pangolin", Arial, Helvetica, sans-serif;
}
.journeys .btn {
    color: rgb(128, 153, 179);
    border: 1px solid rgb(128, 153, 179);
}
.journeys .btn:hover {
    background-color: rgb(128, 153, 179);
    color: white;
}

.journeys .form-control {
    display: block;
    width: 40%;
    float: right;
    margin-top: 5px;
}

.journeys .card:hover {
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.3);
}

.journeys .card-title,
.journeys .card-text,
.container h1,
p.lead {
    user-select: none;
}

#indexcard .mdi-heart-outline {
    color: gray;
    cursor: pointer;
    font-size: 1.2em;
}
#indexcard div.more-info-link,
#indexcard div.likes {
    width: 49%;
}

@media screen and (max-width: 768px) {
    div.search input {
        display: none !important;
    }
    .journeys h1.display-4 {
        font-size: 2em;
        transition: ease 0.3s;
    }
    .journeys p.lead {
        font-size: 1em;
    }
}
</style>