<template>
  <transition name="slide-from-bottom">
    <div v-if="visible" class="velib-stations-window-container">
      <div class="header">
        <div class="title">{{ station.name }}</div>
        <div>station n°{{ station.id }}</div>
        <div class="close-btn">
          <v-btn
            color="#ffffff"
            small
            fab
            elevation="0"
            v-delay-click="onCloseClick"
          >
            <v-icon color="grey">mdi-close</v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider />
      <VelibStationActions @onAddToFavClick="addToFav" @onGoToClick="goTo" />
      <v-divider />

      <div v-if="station.isAvailable" class="content">
        <div class="velib-info">
          <img :src="velibMecaLogo" />
          <div>{{ station.normalBikeCount }}</div>
        </div>
        <div class="velib-info">
          <img :src="velibElecLogo" />
          <div>{{ station.eBikeCount }}</div>
        </div>
        <div class="velib-info">
          <img :src="parkingLogo" />
          <div>{{ station.freePlaceCount }}</div>
        </div>
      </div>
      <div v-else class="not-available">
        <div>Indisponible</div>
        <v-icon color="orange" size="50px">mdi-alert</v-icon>
      </div>
    </div>
  </transition>
</template>
<script>
import VelibStationActions from "@/components/VelibStationInfosWindow/VelibStationActions";
export default {
  props: {
    station: Object,
    visible: Boolean,
  },
  components: {
    VelibStationActions,
  },
  data() {
    return {
      velibMecaLogo: require("@/assets/filter_map_bike.png"),
      velibElecLogo: require("@/assets/filter_map_bike_elec.png"),
      parkingLogo: require("@/assets/filter_map_terminal.png"),
    };
  },
  methods: {
    onCloseClick() {
      this.$emit("closeClick");
    },
    addToFav(label) {
      this.$emit("addVelibStationToFavorites", label);
    },
    goTo(){
       this.$emit("goToVelibStation");
    }
  },
};
</script>
<style>
.velib-stations-window-container {
  box-shadow: 1px -4px 20px 2px #a9a9a9;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  bottom: 0;
  left: 0;
  position: absolute;
  width: 100%;
  z-index: 5;
}

.velib-stations-window-container .header {
  text-align: center;
  position: relative;
  margin: 3px 0;
}

.velib-stations-window-container .header .close-btn {
  position: absolute;
  top: 3px;
  right: 2px;
}

.velib-stations-window-container .content {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 5px;
}

.velib-stations-window-container .content img {
  width: 50px;
  height: auto;
}

.velib-stations-window-container .content .velib-info {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.not-available {
  text-align: center;
  color: rgb(255, 81, 0);
  font-size: 18px;
  font-weight: bold;
  margin: 7px auto;
}
</style>