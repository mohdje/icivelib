<template>
  <v-app>
    <v-main>
      <div class="ad-status-container">
        <v-icon :size="60" :color="icon.color">{{ icon.name }}</v-icon>
        <div class="ad-status">
          {{ message }}
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  mounted() {
    

    window.context.adVideoActivity = this;
    document.addEventListener(
      "adFailedToLoad",
      function (e) {
        window.context.adVideoActivity.showErrorMessage();
      },
      false
    );

    document.addEventListener(
      "adWatched",
      function (e) {
        window.context.adVideoActivity.showSuccessMessage();
      },
      false
    );

    setTimeout(() => {
        window.context.adVideoActivity.loadAdVideo();
    }, 1500);
  },
  data() {
    return {
      message: "Chargement de la publicité en cours...",
      showHandHeart: false,
      icon: {
        name: "mdi-thumb-up",
        color: "white",
      },
    };
  },
  methods: {
    loadAdVideo() {
      window.context.phoneInterface.loadAdVideo();
    },
    showErrorMessage() {
      this.message = "Le chargement de la publicité a échoué";
      setTimeout(() => {
        window.context.phoneInterface.goToPreviousActivity();
      }, 1500);
    },
    showSuccessMessage() {
      this.message = "Merci d'avoir regardé la publicité";
      this.icon.name = "mdi-hand-heart";
      this.icon.color = "red";

      setTimeout(() => {
        window.context.phoneInterface.goToPreviousActivity();
      }, 1500);
    },
  },
};
</script>
<style src="@/styles/activity.css"></style>
<style scoped>
.ad-status-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #3498db;
}

.ad-status {
  font-size: 18px;
  font-weight: 500;
  margin: 50px;
  text-align: center;
  color:white;
}
</style>