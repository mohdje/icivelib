
import Vue from 'vue';
import Activity from './activities/ResearchActivity.vue';
import vuetify from './plugins/vuetify';
import { AsyncCallMobileInterface } from "@/js/asyncCallMobile";
import { vueDirectives } from "@/js/directives";

Vue.config.productionTip = false

vueDirectives.import();

new Vue({
  vuetify,
  render: h => h(Activity),
  mounted() {
    AsyncCallMobileInterface.listenToFinishedAsyncCalls();
  }
}).$mount('#app')


