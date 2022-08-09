import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    networkStatus: "",
    ContentText: "",
    ContentValidation: {},
    dialogAuthAlert: false,
    networkError: false,
    process: {
      run: false
    },
    pagination: {
      limit: 10,
      page: 1
    },
    dialog:{
      confirmDelete: false.valueOf,
      container: false,
      title: '', // title dialog
      type: '', // type dialog
      width: '', // width dialog
    },
    token: "",
    authenticated: false,
    user: {}
  },
  mutations: {
    SET(state, {
      key,
      value
    }) {
      state[key] = value;
    },
    setToken(state, accessToken) {
      state.token = accessToken
      state.authenticated = true
    },
    setSerial(state, accessSerial) {
      state.serial = accessSerial
    },
    setUser(state, accessUser) {
      state.user = accessUser
    }
  },
  actions: {
  },
  modules: {
  }
})
