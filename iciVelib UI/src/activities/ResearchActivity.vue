<template>
  <v-app>
    <v-main>
      <ReloadViewButton
        v-if="reloadViewButtonVisible"
        @click="location.reload()"
      />
      <ResearchView
        @networkUnavailable="handleNetworkUnavailable(false)"
      />
    </v-main>
  </v-app>
</template>

<script>
import ResearchView from "@/components/Research/ResearchView";
import ReloadViewButton from "@/components/ReloadViewButton";
import { PhoneInterface } from "@/js/phoneInterface";

export default {
  name: "ResearchActivity",
  components: {
    ResearchView,
    ReloadViewButton,
  },
  mounted() {
    if (!PhoneInterface.networkAvailable()) this.handleNetworkUnavailable(true);
  },

  data: () => ({
    reloadViewButtonVisible: false,
  }),
  methods: {
    handleNetworkUnavailable(showReloadButton) {
      this.reloadViewButtonVisible = showReloadButton;
      PhoneInterface.showToastMessage("Vérifiez votre connexion internet");
    },
  },
};
</script>
<style src="@/styles/map-marker.css"></style>
<style src="@/styles/transitions.css"></style>
<style src="@/styles/activity.css"></style>
