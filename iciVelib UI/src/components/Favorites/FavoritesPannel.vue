<template>
  <v-navigation-drawer
    v-model="visible"
    absolute
    right
    temporary
    style="z-index: 20"
    touchless
  >
    <div class="favorites-panel-container">
      <div class="favorites-panel-header">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="white">mdi-star</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="color: white">Favoris</v-list-item-title>
          </v-list-item-content>

          <v-list-item-content style="justify-content: flex-end">
            <v-btn
              fab
              small
              color="#646464"
              elevation="0"
              @click="updateFavoriteStationsList"
            >
              <v-icon color="white">mdi-refresh</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="favorites-content">
        <v-progress-circular
          v-if="isLoading"
          indeterminate
          color="grey"
          class="loading-progress"
        ></v-progress-circular>
        <v-list v-else dense style="padding: 0">
          <FavoriteVelibStation
            v-for="station in favoritesStations"
            :key="station.id"
            :station="station"
            @click="favoriteStationClick"
            @deleteClick="askConfirmationToDeleteFavorite"
            @editCustomLabelClick="editCustomLabelClick"
          />
        </v-list>
      </div>
    </div>
    <YesNoDialog
      text="Voulez-vous supprimer cette station Velib de vos favoris ?"
      title="Favoris"
      :visible="yesNoDialog.visible"
      @yesClick="yesNoDialog.onYesClick"
      @noClick="yesNoDialog.visible = false"
    />
    <InputTextDialog
      text="Modifiez le label personnalisé de cette station Velib"
      title="Favoris"
      @validateClick="inputTextDialog.onValidateClick"
      @cancelClick="inputTextDialog.visible = false"
      :visible="inputTextDialog.visible"
      :defaultTextInput="inputTextDialog.defaultTextInput"
      placeHolder="Station devant bureau"
    />
  </v-navigation-drawer>
</template>
<script>
import FavoriteVelibStation from "@/components/Favorites/FavoriteVelibStation";
import YesNoDialog from "@/components/Dialogs/YesNoDialog";
import InputTextDialog from "@/components/Dialogs/InputTextDialog";
import { PhoneInterface } from "@/js/phoneInterface.js";
import { FavoritesStationsStore } from "@/js/store.js";

export default {
  components: {
    FavoriteVelibStation,
    YesNoDialog,
    InputTextDialog,
  },
  mounted() {
    window.context.favoritesPannel = this;
    window.context.phoneInterface = PhoneInterface;
  },
  computed: {
    favoritesStations() {
      return FavoritesStationsStore.stations;
    },
    isLoading(){
      return FavoritesStationsStore.isLoading;
    }
  },
  data() {
    return {
      visible: false,
      yesNoDialog: {
        visible: false,
        onYesClick: () => {},
      },
      inputTextDialog: {
        visible: false,
        onValidateClick: () => {},
        defaultTextInput: "",
      },
    };
  },
  methods: {
    show(){
      this.visible = true;
    },
    hide(){
      this.visible = false;
    },
    updateFavoriteStationsList() {
      FavoritesStationsStore.load();
    },
    favoriteStationClick(station) {
      this.$emit("favoriteClick", station);
    },
    askConfirmationToDeleteFavorite(station) {
      this.yesNoDialog.onYesClick = () => {
        FavoritesStationsStore.delete(station.id);
        this.yesNoDialog.visible = false;
      };
      this.yesNoDialog.visible = true;
    },
    editCustomLabelClick(station) {
      this.inputTextDialog.defaultTextInput = station.customLabel;
      this.inputTextDialog.onValidateClick = (text) => {
        FavoritesStationsStore.update(station.id, text);
        this.inputTextDialog.visible = false;
      };
      this.inputTextDialog.visible = true;
    },
  },
};
</script>
<style>
.favorites-panel-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.favorites-panel-header {
  background-color: #919191;
  width: 100%;
}

.favorites-content {
  overflow-y: scroll;
  overflow-x: hidden;
  flex-grow: 2000;
  position: relative;
  width: 100%;
}

.favorites-content .loading-progress {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>