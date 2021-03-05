import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#a2b43a', 
          secondary: '#3498db', 
          accent: '#919191',
        },
      },
    },
  })