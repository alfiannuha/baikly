import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import VeeValidate from '@/plugins/VeeValidate.js'
import Convert from "./plugins/Convert.js"
import Lodash from "./plugins/Lodash.js"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VeeValidate,
  Convert,
  Lodash,
  render: h => h(App)
}).$mount('#app')
