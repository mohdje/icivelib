import Activity from '@/activities/ResearchActivity.vue';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import { vueDirectives } from "@/js/directives";
import { PhoneInterface } from "@/js/phoneInterface.js";
import { MapMarker } from "@/js/mapMarker.js";
import { FavoritesStationsStore } from "@/js/store.js";

Vue.config.productionTip = false;

window.context = {
  phoneInterface: PhoneInterface,
  mapMarker: MapMarker,
  favoriteStationStore: FavoritesStationsStore
};

vueDirectives.import();

new Vue({
  vuetify,
  render: h => h(Activity),
}).$mount('#app')


