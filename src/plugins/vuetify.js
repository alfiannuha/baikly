import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Ripple
  }
});

export default new Vuetify({
});
