import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'

Vue.config.productionTip = false

//filters
Vue.filter('dateFormat', value => {
  return moment(value).format('lll');
})

Vue.filter('snippet', value => {
  return value.slice(0,80) + ' ...';
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
