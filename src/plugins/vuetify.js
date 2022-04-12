import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  directives: {
    Ripple
  },
  FontFaceSet: {
    'Montserrat': {
      'fontFamily': 'Montserrat',
      'src': 'url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap")',
    },
  },
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: '#23A6F0',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
        warning: '#ffeb3b',
        info: '#2196f3',
        success: '#4caf50',
      },
    },
  },
});

export default new Vuetify({
});
