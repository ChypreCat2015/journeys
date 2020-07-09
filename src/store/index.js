import Vue from 'vue'
import Vuex from 'vuex'
import db from "@/firebase/init";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        journeysList: []
    },
    getters: {
        journeysList: state => state.journeysList,
        singleJourney: (state) => (nameKey) => {
            for (let i = 0; i < state.journeysList.length; i++) {
                if (state.journeysList[i].slug === nameKey) {
                    return state.journeysList[i];
                }
            }
        },
    },
    actions: {
        //Get data from firebase
        async getJourneys({ commit }) {
            let journeys = [];
            await db.collection("journeys")
                .orderBy("createdAt", "desc")
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        const journey = doc.data();
                        journey.id = doc.id;
                        journeys.push(journey);
                    })
                });
            console.log(`From action - getJourneys: get firebase journeys collection successfully`)
            //commit data to mutation, and then to state
            commit('setJourneys', journeys);
        },
    },
    mutations: {
        setJourneys: (state, journeysList) => state.journeysList = journeysList
    },
    modules: {
    }
})
