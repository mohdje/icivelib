<template>
  <v-app>
    <v-main>
      <ReloadViewButton
        v-if="reloadViewButtonVisible"
        @click="location.reload()"
      />
      <ResearchView
        :favoriteVelibStations="favoriteVelibStations"
        @networkUnavailable="handleNetworkUnavailable(false)"
      />
    </v-main>
  </v-app>
</template>

<script>
import ResearchView from "@/components/Research/ResearchView";
import ReloadViewButton from "@/components/ReloadViewButton";
import { PhoneInterface } from "@/js/phoneInterface";
import { AsyncCallMobileInterface } from "@/js/asyncCallMobile";

export default {
  name: "ResearchActivity",
  components: {
    ResearchView,
    ReloadViewButton,
  },
  computed: {
    favoriteVelibStations() {
      return AsyncCallMobileInterface.getAsyncCallResult(
        PhoneInterface.getFavoriteVelibStationsCallId
      );
    },
  },

  mounted() {
    if (PhoneInterface.networkAvailable()) {
      PhoneInterface.getFavoritesVelibStationsAsync();
    } else this.handleNetworkUnavailable(true);
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

<style>
html,
body {
  overflow: hidden;
}

/*to remove focus on button when clicked*/
.v-btn:not(.v-btn--text):not(.v-btn--outlined):hover:before {
  opacity: 0 !important;
}

.theme--dark.v-btn:hover::before {
  opacity: 0 !important;
}

.v-btn:not(.v-btn--text):not(.v-btn--outlined):focus:before {
  opacity: 0 !important;
}
/*to remove focus on v-switch when clicked*/
.v-input--selection-controls__ripple:before {
  opacity: 0 !important;
}

/*to remove focus on v-list-item when clicked*/
.theme--light.v-list-item:hover::before {
    opacity: 0 !important;
}

.v-dialog--fullscreen {
  height: 100vh !important;
}
</style>
