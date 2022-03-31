<template>
  <v-list-item
    class="favorite"
    v-delay-click="emitClick"
    v-touch-start="handleTouchStart"
    v-touch-move="handleTouchMove"
    v-touch-end="handleTouchEnd"
    ripple
  >
    <div
      class="swipe-btn delete-favorite"
      :style="deletePanelStyle"
    >
      Supprimer
    </div>

    <div
      class="swipe-btn modify-favorite"
      :style="modifyPanelStyle"
    >
      Modifier
    </div>

    <v-list-item-content style="padding: 10px 0 0 0">
      <div class="custom-label">{{ station.customLabel }}</div>
      <div class="name">{{ station.name }}</div>
      <div class="id">station n°{{ station.id }}</div>
      <div v-if="station.isAvailable" class="velib-infos-container">
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
        <v-icon color="orange" size="40px">mdi-alert</v-icon>
      </div>
      <v-divider></v-divider>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  props: {
    station: Object,
  },
  data() {
    return {
      velibMecaLogo: require("@/assets/filter_map_bike.png"),
      velibElecLogo: require("@/assets/filter_map_bike_elec.png"),
      parkingLogo: require("@/assets/filter_map_terminal.png"),
      deletePanelStyle: {
        left: "100%",
        opacity: 0.1,
      },
      modifyPanelStyle: {
        right: "100%",
        opacity: 0.1,
      },
      swipeDeleteStarted: false,
      swipeModifyStarted: false,
    };
  },
  methods: {
    emitClick() {
      this.$emit("click", this.station);
      this.deletePanelStyle.left = "100%";
    },
    handleTouchStart(event) {
      var touch = event.touches[0];
      var windowWidth = event.view.innerWidth;
      const LeftPourcentInElement = (touch.clientX - (windowWidth - this.$el.clientWidth)) / this.$el.clientWidth;
      this.swipeDeleteStarted = LeftPourcentInElement > 0.8;
      this.swipeModifyStarted = LeftPourcentInElement < 0.2;
    },
    handleTouchMove(event) {
      var touch = event.touches[0];
      var windowWidth = event.view.innerWidth;
      const XPosition = touch.clientX - (windowWidth - this.$el.clientWidth);
      if (this.swipeDeleteStarted && XPosition >= 0) {       
        this.deletePanelStyle.left = XPosition + "px";
        this.deletePanelStyle.opacity = 1 - XPosition / this.$el.clientWidth;
      }
      else if (this.swipeModifyStarted && XPosition <= this.$el.clientWidth) {       
        this.modifyPanelStyle.right = (this.$el.clientWidth - XPosition) + "px";
        this.modifyPanelStyle.opacity = XPosition / this.$el.clientWidth;
      }
    },
    handleTouchEnd() {
      this.swipeDeleteStarted = false;
      if(this.deletePanelStyle.opacity > 0.9)
        this.$emit("deleteClick", this.station);

      this.deletePanelStyle.left = "100%";
      this.deletePanelStyle.opacity = 0;

      this.swipeModifyStarted = false;
      if(this.modifyPanelStyle.opacity > 0.9)
        this.$emit("editCustomLabelClick", this.station);

      this.modifyPanelStyle.right = "100%";
      this.modifyPanelStyle.opacity = 0;
    },
  },
};
</script>
<style>
.favorite {
  text-align: center;
  padding: 0;
}

.favorite .custom-label {
  font-weight: bold;
  color: #3498db;
  font-size: 16px;
}

.favorite .name {
  font-weight: bold;
  color: black;
  font-size: 14px;
}

.favorite .id {
  color: black;
  font-size: 13px;
}

.velib-infos-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 12px 7px !important;
}

.velib-infos-container .velib-info {
  text-align: center;
  font-weight: bold;
}

.velib-infos-container .velib-info img {
  width: 40px;
  height: auto;
}

.swipe-btn{
  position: absolute;
  top: 0;
  height: 100%;
  padding: 40px 10px;
  z-index: 3;
  width: 100%;
  font-weight: bold;
  font-size: 18px;
}

.swipe-btn.delete-favorite {
  background-color: red;
  color: white;
  text-align: left;
}

.swipe-btn.modify-favorite {
  background-color: #3498db;
  color: white;
  text-align: right;
}

.edit-btn {
  position: absolute;
  top: 0;
  right: 0;
  margin: 3px;
}

.not-available {
  text-align: center;
  color: rgb(255, 81, 0);
  font-size: 18px;
  font-weight: bold;
  margin: 7px auto;
}
</style>