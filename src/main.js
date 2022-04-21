import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import '@/assets/css/main.css'

import VeeValidate from '@/plugins/VeeValidate.js'
import Convert from "./plugins/Convert.js"
import Lodash from "./plugins/Lodash.js"

Vue.config.productionTip = false

import { TokenService } from "@/service/Storage.Service.js"

if (TokenService.getToken()) {
  store.commit("setToken", TokenService.getToken())
  store.commit("setUser", JSON.parse(TokenService.getUser()))
}

new Vue({
  router,
  store,
  vuetify,
  VeeValidate,
  Convert,
  Lodash,
  render: h => h(App)
}).$mount('#app')
