<template>
  <v-list-item
    class="favorite"
    @click="emitClick"
    v-touch-start="handleTouchStart"
    v-touch-move="handleTouchMove"
    v-touch-end="handleTouchEnd"
  >
    <div
      class="delete-favorite"
      :style="deletePanelStyle"
      v-touch-start="handleTouchStart"
      v-touch-move="handleTouchMove"
      v-touch-end="handleTouchEnd"
      @click.stop="emitDeleteClick"
    >
      <div>Supprimer</div>
    </div>
    <div class="edit-btn">
      <v-btn color="#ffffff00" small fab elevation="0" @click.stop="emitEditCustomLabelClick">
        <v-icon color="#3498db">mdi-pencil</v-icon>
      </v-btn>
    </div>

    <v-list-item-content style="padding: 10px 0 0 0">
      <div class="custom-label">{{ station.customLabel }}</div>
      <div class="name">{{ station.name }}</div>
      <div class="id">station n°{{ station.id }}</div>
      <div v-if="station.isAvailable" class="velib-infos-container">
        <div  class="velib-info">
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
        width: "90px",
      },
      touchEventStarted: false,
    };
  },
  methods: {
    emitClick() {
      this.$emit("click", this.station);
      this.deletePanelStyle.left = "100%";
    },
    emitDeleteClick() {
      this.$emit("deleteClick", this.station);
      this.deletePanelStyle.left = "100%";
    },
    emitEditCustomLabelClick(){
        this.$emit("editCustomLabelClick", this.station);
    },
    handleTouchStart(event) {
      var touch = event.touches[0];
      var windowWidth = event.view.innerWidth;
      this.touchEventStarted = touch.screenX > windowWidth * 0.7;
    },
    handleTouchMove(event) {
      var touch = event.touches[0];
      var windowWidth = event.view.innerWidth;
      if (this.touchEventStarted && touch.clientX > windowWidth * 0.7)
        this.deletePanelStyle.left =
          touch.clientX - (windowWidth - this.$el.clientWidth) + "px";
    },
    handleTouchEnd(event) {
      this.touchEventStarted = false;
      var deletePanelX = this.deletePanelStyle.left.replace("px", "");
      if (deletePanelX < this.$el.clientWidth * 0.85)
        this.deletePanelStyle.left =
          this.$el.clientWidth -
          this.deletePanelStyle.width.replace("px", "") +
          "px";
      else this.deletePanelStyle.left = "100%";
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

.delete-favorite {
  position: absolute;
  background-color: red;
  color: white;
  top: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

.delete-favorite:active {
  background-color: rgb(158, 14, 14);
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