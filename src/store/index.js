import Vue from 'vue'
import Vuex from 'vuex'
import db from "@/firebase/init"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        journeysList: [],
        singleJourney: {}
    },
    getters: {
        journeysList: state => state.journeysList,
        singleJourney: state => state.singleJourney
    },
    actions: {
        //Get data from firebase
        async getJourneys({ commit }) {
            let journeys = [];
            await db.firestore().collection("journeys")
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

        //Get singleJourney
        async getSingleJourney({ commit }, nameKey) {
            let singleJourney;
            let ref = await db.firestore().collection("journeys").where("slug", "==", nameKey);
            await ref.get().then(snapshot => {
                snapshot.forEach(doc => {
                    singleJourney = doc.data();
                    singleJourney.id = doc.id;
                })
            })
            console.log(`From action - get singleJourney successfully`)
            commit('setSingleJourney', singleJourney);
        }
    },
    mutations: {
        setJourneys: (state, journeysList) => state.journeysList = journeysList,
        setSingleJourney: (state, singleJourney) => state.singleJourney = singleJourney,
    }
})
