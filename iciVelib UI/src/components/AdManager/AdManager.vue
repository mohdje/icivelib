<template>
  <AdStatusDialog ref="adStatusDialog" />
</template>
<script>
import AdStatusDialog from "./AdStatusDialog.vue";

export default {
  components: {
    AdStatusDialog,
  },
  mounted() {
    window.context.adManager = this;
    document.addEventListener(
      "adFailedToLoad",
      function (e) {
        window.context.adManager.$refs.adStatusDialog.showErrorStatus();
        setTimeout(() => {
            window.context.adManager.$refs.adStatusDialog.hide();
        }, 2000);
      },
      false
    );

    document.addEventListener(
      "adWatched",
      function (e) {
        window.context.adManager.$refs.adStatusDialog.showSuccessStatus();
        setTimeout(() => {
            window.context.adManager.$refs.adStatusDialog.hide();
        }, 2000);
      },
      false
    );
  },
  methods: {
    showAd() {
      this.$refs.adStatusDialog.showLoadingStatus();
      setTimeout(() => {
        window.context.phoneInterface.showAdVideo(true);
      }, 1000);
    },
  },
};
</script>