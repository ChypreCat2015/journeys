import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

//markdown editor
// import mavonEditor from 'mavon-editor'
// import 'mavon-editor/dist/css/index.css'


Vue.config.productionTip = false

//filters 
Vue.filter('dateFormat', value => {
    return moment(value).format('lll');
})

//this is for journeys page
Vue.filter('snippet', value => {
    return value.slice(0, 80) + ' ...';
})

//this is for showJourney page
Vue.filter('customizedFromNow', value => {
    return moment(value).fromNow();
})

//use markdown
// Vue.use(mavonEditor);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
