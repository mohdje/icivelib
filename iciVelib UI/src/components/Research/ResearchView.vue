<template>
  <div class="research-view-container">
    <Map
      :centerViewPosition="viewPosition"
      :customMarkers="mapMarkers"
      @mapClick="onMapClick"
      @customMarkerClick="onCustomMarkerClick"
    />
    <ResearchHeader
      @filterClick="showFiltersPannel"
      @locationSelected="onLocationSelected"
      @geolocationClick="onGeolocationClick"
      @favoritesClick="showFavoritePannel"
      :showFavoritesButton="hasFavoriteStations"
    />
    <ResearchResultLabel
      ref="resultLabel"
    />
    <ResearchFilterPannel
      ref="filtersPannel"
      :filterValues="filterValues"
    />
    <FavoritesPannel
      ref="favoritesPannel"
      @favoriteClick="showStationOnMap"
    />
    <LoadingWindow
      ref="loadingWindow"
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
  mounted() {
    window.context.researchView = this;
    window.context.mapMarker = MapMarker;
    window.context.favoriteStationStore.load();
  },
  computed: {
    velibStationWindowsVisible() {
      return !!(this.selectedStation && this.selectedStation.id);
    },
    hasFavoriteStations() {
      const hasStations = window.context.favoriteStationStore.hasStations();
      if (!hasStations) this.hideFavoritePannel();
      return hasStations;
    },
  },
  data() {
    return {
      viewPosition: {
        lngLat: [2.3488, 48.8534],
        zoom: 12,
      },
      selectedStation: {},
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
      mapMarkers: []
    };
  },
  methods: {
    onMapClick(position) {
      this.addPositionMarker(position.lng, position.lat);
      this.searchVelibStations(position.lng, position.lat);
    },
    onCustomMarkerClick(marker) {
      this.selectedStation = marker.data;
      window.context.mapMarker.unselectMarkers(this.mapMarkers);
      window.context.mapMarker.selectMarker(marker);
      this.viewPosition = {
        lngLat: [marker.coordinates.lng, marker.coordinates.lat],
        zoom:
          marker.type === "full" ? this.viewPosition.zoom : marker.maxZoom + 1,
      };
    },
    onLocationSelected(coordinates) {
      this.addPositionMarker(coordinates[0], coordinates[1]);
      this.searchVelibStations(coordinates[0], coordinates[1]);
    },
    onGeolocationClick() {
      this.showLoadingWindow("Acquisition de votre position en cours");

      setTimeout(() => {
        window.context.phoneInterface.getGpsLocationAsync((e) => {
          window.context.researchView.hideLoadingWindow();
          if (e.result && e.result.location) {
            window.context.researchView.addPositionMarker(
              e.result.location.longitude,
              e.result.location.latitude
            );
            window.context.researchView.searchVelibStations(
              e.result.location.longitude,
              e.result.location.latitude
            );
          }
          else if(e.result && e.result.exception)
            window.context.phoneInterface.showToastMessage(e.result.exception);
        });
      }, 1000);
    },
    addPositionMarker(lng, lat) {
      this.viewPosition = {
        lngLat: [lng, lat],
        zoom: 14,
      };
      this.mapMarkers = [window.context.mapMarker.getPositionMarker(lng, lat)];
    },
    showLoadingWindow(message) {
      this.$refs.loadingWindow.show(message);
    },
    hideLoadingWindow() {
      this.$refs.loadingWindow.hide();
    },
    showFiltersPannel(){
      this.$refs.filtersPannel.show();
    },
    getFilterValues() {
      return this.filterValues.shouldMatch
        .filter((s) => s.value)
        .map((f) => f.name);
    },
    searchVelibStations(lng, lat) {
      if (!window.context.phoneInterface.networkAvailable()) {
        this.hideLoadingWindow();
        this.$emit("networkUnavailable");
        return;
      }

      this.selectedStation = {};
      this.showLoadingWindow(
        "Recherche de stations Velib autour de cette position..."
      );

      setTimeout(() => {
        window.context.phoneInterface.getVelibStationsFromPositionAsync(
          lat,
          lng,
          this.filterValues.distanceMax * 1000,
          this.getFilterValues(),
          (e) => {
            const stations = e.result ? e.result : [];
            stations.forEach((station) => {
              window.context.researchView.mapMarkers.push(
                window.context.mapMarker.getVelibStationMarker(station)
              );
              window.context.researchView.mapMarkers.push(
                window.context.mapMarker.getVelibStationLiteMarker(station)
              );
            });
            window.context.researchView.hideLoadingWindow();
            window.context.researchView.$refs.resultLabel.show(stations.length === 0 ? "Aucune station Velib trouvée":  stations.length + " station(s) Velib trouvée(s)");
          }
        );
      }, 1000);
    },
    onVelibStationsWindowCloseClick() {
      this.selectedStation = {};
      window.context.mapMarker.unselectMarkers(this.mapMarkers);
    },
    showStationOnMap(station) {
      this.mapMarkers = [];
      this.mapMarkers.push(window.context.mapMarker.getVelibStationMarker(station));
      this.mapMarkers.push(window.context.mapMarker.getVelibStationLiteMarker(station));
      this.selectedStation = station;

      setTimeout(() => {
        const selectedStationMarker = window.context.researchView.mapMarkers[0];
        window.context.researchView.viewPosition = {
          lngLat: [
            selectedStationMarker.coordinates.lng,
            selectedStationMarker.coordinates.lat,
          ],
          zoom: 16,
        };
        window.context.mapMarker.selectMarker(selectedStationMarker);
      }, 200);
      this.hideFavoritePannel();
    },
    addSelectedStationToFavorites(customLabel) {
      window.context.favoriteStationStore.add(this.selectedStation.id, customLabel);
    },
    showFavoritePannel() {
      if (this.$refs.favoritesPannel) this.$refs.favoritesPannel.show();
    },
    hideFavoritePannel() {
      if (this.$refs.favoritesPannel) this.$refs.favoritesPannel.hide();
    },
    goToSelectedVelibStation() {
      window.context.phoneInterface.openGoogleMaps(
        this.selectedStation.latitude,
        this.selectedStation.longitude
      );
    },
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