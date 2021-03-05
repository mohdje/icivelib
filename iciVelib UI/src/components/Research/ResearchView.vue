<template>
  <div class="research-view-container">
    <Map
      :centerViewPosition="viewPosition"
      :customMarkers="mapMarkers"
      @mapClick="onMapClick"
      @customMarkerClick="onCustomMarkerClick"
    />
    <ResearchHeader
      @filterClick="researchFilterPannelVisible = true"
      @locationSelected="onLocationSelected"
      @geolocationClick="onGeolocationClick"
      @favoritesClick="favoritesPannelVisible = true"
      :showFavoritesButton="
        favoriteVelibStations && favoriteVelibStations.length > 0
      "
    />
    <ResearchResultLabel
      :visible="resultLabel.visible"
      :text="resultLabel.text"
    />
    <ResearchFilterPannel
      :isVisible="researchFilterPannelVisible"
      :filterValues="filterValues"
      @onResearchFilterClose="researchFilterPannelVisible = false"
    />
    <FavoritesPannel
      :velibStations="favoriteVelibStations"
      :isVisible="favoritesPannelVisible"
      @onClose="favoritesPannelVisible = false"
      @refreshClick="updateFavoritesList"
      @favoriteClick="showStationOnMap"
      @deleteFavoriteClick="deleteFavotiteVelibStation"
      @customLabelEdited="updateFavoriteVelibStation"
    />
    <LoadingWindow
      :isVisible="loadingWindow.visible"
      :label="loadingWindow.label"
      @windowClose="loadingWindow.visible = false"
    />
    <VelibStationInfosWindow
      :station="selectedStation"
      :visible="velibStationWindowsVisible"
      @addVelibStationToFavorites="addSelectedStationToFavorites"
      @goToVelibStation="goToSelectedVelibStation"
      @closeClick="onVelibStationsWindowCloseClick"
    />
  </div>
</template>
<script>
import Map from "@/components/Map";
import ResearchHeader from "@/components/Research/ResearchHeader";
import ResearchFilterPannel from "@/components/Research/ResearchFilterPannel";
import LoadingWindow from "@/components/Research/LoadingWindow";
import ResearchResultLabel from "@/components/Research/ResearchResultLabel";
import VelibStationInfosWindow from "@/components/VelibStationInfosWindow/VelibStationInfosWindow";
import FavoritesPannel from "@/components/Favorites/FavoritesPannel";
import { MapMarker } from "@/js/mapMarker.js";
import { PhoneInterface } from "@/js/phoneInterface.js";

export default {
  name: "ResearchView",
  components: {
    Map,
    ResearchHeader,
    ResearchFilterPannel,
    LoadingWindow,
    ResearchResultLabel,
    VelibStationInfosWindow,
    FavoritesPannel,
  },
  props: {
    favoriteVelibStations: Array,
  },
  computed: {
    velibStationWindowsVisible() {
      return !!(this.selectedStation && this.selectedStation.id);
    },
  },
  data() {
    return {
      viewPosition: {
        lngLat: [2.3488, 48.8534],
        zoom: 12,
      },
      selectedStation: {},
      researchFilterPannelVisible: false,
      favoritesPannelVisible: false,
      filterValues: {
        distanceMax: 3,
        shouldMatch: [
          {
            name: "velib_meca",
            label: "Velibs mécaniques",
            value: false,
          },
          {
            name: "velib_elec",
            label: "Velibs électriques",
            value: false,
          },
          {
            name: "free_parking",
            label: "Places libres",
            value: false,
          },
        ],
      },
      mapMarkers: [],
      loadingWindow: {
        visible: false,
        label: "",
      },
      resultLabel: {
        text: "",
        visible: false,
      },
    };
  },
  methods: {
    onMapClick(position) {
      this.addPositionMarker(position.lng, position.lat);
      this.searchVelibStations(position);
    },
    onCustomMarkerClick(marker) {
      this.selectedStation = marker.data;
      MapMarker.unselectMarkers(this.mapMarkers);
      MapMarker.selectMarker(marker);
      this.viewPosition = {
        lngLat: [marker.coordinates.lng, marker.coordinates.lat],
        zoom:
          marker.type === "full" ? this.viewPosition.zoom : marker.maxZoom + 1,
      };
    },
    onLocationSelected(coordinates) {
      this.addPositionMarker(coordinates[0], coordinates[1]);
      this.searchVelibStations({ lng: coordinates[0], lat: coordinates[1] });
    },
    onGeolocationClick() {
      this.showLoadingWindow("Acquisition de votre position en cours");

      var self = this;
      setTimeout(() => {
        var phoneLocation = PhoneInterface.getGpsLocation();
        if (phoneLocation) {
          self.addPositionMarker(phoneLocation.lng, phoneLocation.lat);
          self.searchVelibStations(phoneLocation);
        } else self.hideLoadingWindow();
      }, 2000);
    },
    addPositionMarker(lng, lat) {
      this.viewPosition = {
        lngLat: [lng, lat],
        zoom: 14,
      };
      this.mapMarkers = [MapMarker.getPositionMarker(lng, lat)];
    },

    showLoadingWindow(message) {
      this.loadingWindow.label = message;
      this.loadingWindow.visible = true;
    },
    hideLoadingWindow() {
      this.loadingWindow.visible = false;
    },
    showResearchResultLabel(result) {
      if (!result || result === 0)
        this.resultLabel.text = "Aucune station Velib trouvée";
      else this.resultLabel.text = result + " station(s) Velib trouvée(s)";

      this.resultLabel.visible = true;
      var self = this;
      setTimeout(() => {
        self.resultLabel.visible = false;
      }, 4000);
    },
    getFilterValues() {
      return this.filterValues.shouldMatch
        .filter((s) => s.value)
        .map((f) => f.name);
    },
    searchVelibStations(position) {
      if (!PhoneInterface.networkAvailable()) {
        this.hideLoadingWindow();
        this.$emit("networkUnavailable");
        return;
      }

      this.selectedStation = {};
      this.showLoadingWindow(
        "Recherche de stations Velib autour de cette position..."
      );

      var self = this;
      setTimeout(() => {
        var stations = PhoneInterface.getVelibStationsFromPosition(
          position.lat,
          position.lng,
          this.filterValues.distanceMax * 1000,
          this.getFilterValues()
        );
        stations.forEach((station) => {
          self.mapMarkers.push(MapMarker.getVelibStationMarker(station));
          self.mapMarkers.push(MapMarker.getVelibStationLiteMarker(station));
        });

        self.hideLoadingWindow();
        self.showResearchResultLabel(stations.length);
      }, 2000);
    },
    onVelibStationsWindowCloseClick() {
      this.selectedStation = {};
      MapMarker.unselectMarkers(this.mapMarkers);
    },
    updateFavoritesList() {
      if (!PhoneInterface.networkAvailable()) {
        this.$emit("networkUnavailable");
        return;
      }
      PhoneInterface.getFavoritesVelibStationsAsync();
    },
    showStationOnMap(station) {
      this.mapMarkers = [];
      this.mapMarkers.push(MapMarker.getVelibStationMarker(station));
      this.mapMarkers.push(MapMarker.getVelibStationLiteMarker(station));
      this.selectedStation = station;

      const self = this;
      setTimeout(() => {
        const selectedStationMarker = self.mapMarkers[0];
        self.viewPosition = {
          lngLat: [selectedStationMarker.coordinates.lng, selectedStationMarker.coordinates.lat],
          zoom: 16,
        };
        MapMarker.selectMarker(selectedStationMarker);
      }, 200);
    },
    addSelectedStationToFavorites(customLabel){
      PhoneInterface.addFavoriteVelibStationAsync(this.selectedStation.id, customLabel);
    },
    deleteFavotiteVelibStation(stationId){
      PhoneInterface.removeFavoriteVelibStationAsync(stationId);
    },
    updateFavoriteVelibStation(station){
      PhoneInterface.updateFavoriteVelibStation(station);
    },
    goToSelectedVelibStation(){
      PhoneInterface.openGoogleMaps(this.selectedStation.latitude, this.selectedStation.longitude);
    }
  },
};
</script>
<style>
.research-view-container {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>