<template>
  <v-navigation-drawer
    v-model="panelVisible"
    absolute
    right
    temporary
    style="z-index: 20"
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
              @click="refreshClick"
            >
              <v-icon color="white">mdi-refresh</v-icon>
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="favorites-content">
        <v-progress-circular
          v-if="!(favoritesStations && favoritesStations.length > 0)"
          indeterminate
          color="grey"
          class="loading-progress"
        ></v-progress-circular>
        <v-list dense style="padding: 0">
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

export default {
  components: {
    FavoriteVelibStation,
    YesNoDialog,
    InputTextDialog,
  },
  props: {
    velibStations: Array,
    isVisible: Boolean,
  },
  watch: {
    isVisible(value) {
      this.panelVisible = value;
    },
    panelVisible(value) {
      if (value) this.$emit("onOpen");
      else this.$emit("onClose");
    },
    velibStations(value) {
      this.favoritesStations = value;
    }
  },
  data() {
    return {
      panelVisible: false,
      favoritesStations: [],
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
    refreshClick() {
      this.favoritesStations = [];
      this.$emit("refreshClick");
    },
    favoriteStationClick(station) {
      this.panelVisible = false;
      this.$emit("favoriteClick", station);
    },
    askConfirmationToDeleteFavorite(station) {
      this.yesNoDialog.onYesClick = () => {
        this.$emit("deleteFavoriteClick", station.id);
        this.yesNoDialog.visible = false;
      };
      this.yesNoDialog.visible = true;
    },
    editCustomLabelClick(station) {
      this.inputTextDialog.defaultTextInput = station.customLabel;
      this.inputTextDialog.onValidateClick = (text) => {
        station.customLabel = text;
        this.$emit("customLabelEdited", station);
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