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

export default {
  name: "ResearchActivity",
  components: {
    ResearchView,
    ReloadViewButton,
  },
  mounted() {
    if (!window.context.phoneInterface.networkAvailable()) this.handleNetworkUnavailable(true);
  },

  data: () => ({
    reloadViewButtonVisible: false,
  }),
  methods: {
    handleNetworkUnavailable(showReloadButton) {
      this.reloadViewButtonVisible = showReloadButton;
      window.context.phoneInterface.showToastMessage("Vérifiez votre connexion internet");
    },
  },
};
</script>
<style src="@/styles/map-marker.css"></style>
<style src="@/styles/transitions.css"></style>
<style src="@/styles/activity.css"></style>
