import Activity from '@/activities/AdVideoActivity.vue';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import { vueDirectives } from "@/js/directives";
import { PhoneInterface } from "@/js/phoneInterface.js";

import { FavoritesStationsStore } from "@/js/store.js";

Vue.config.productionTip = false;

window.context = {
  phoneInterface: PhoneInterface,
  favoriteStationStore: FavoritesStationsStore
};

vueDirectives.import();

new Vue({
  vuetify,
  render: h => h(Activity),
}).$mount('#app')


