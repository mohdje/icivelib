import Activity from '@/activities/ResearchActivity.vue';
import Vue from 'vue';
import vuetify from './plugins/vuetify';
import { vueDirectives } from "@/js/directives";

Vue.config.productionTip = false;

window.context = {};

vueDirectives.import();

new Vue({
  vuetify,
  render: h => h(Activity),
}).$mount('#app')


