<template>
  <div class="map-container" id="map"></div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import ApiTokens from "@/js/apiTokens.js";

export default {
  name: "Map",
  props: {
    customMarkers: Array,
    centerViewPosition: Object,
  },
  mounted() {
    mapboxgl.accessToken = ApiTokens.mapboxToken;
    this.map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: this.centerViewPosition.lngLat,
      zoom: 9,
    });

    var mapVue = this;
    this.map.on("load", function () {
      mapVue.removeMapBoxLinks();
    });
    this.map.on("click", function (e) {
      mapVue.$emit("mapClick", e.lngLat);
    });
    this.map.on("zoom", function (e) {
      mapVue.updateMarkersVisibility();
    });
  },
  data() {
    return {
      map: "",
      markersOnMap: [],
    };
  },
  watch: {
    customMarkers() {
      this.removeMarkers();
      this.customMarkers.forEach((marker) => {
        this.insertCustomMarker(marker);
      });
      this.updateMarkersVisibility();
    },
    centerViewPosition(viewPosition) {
      this.setView(viewPosition.lngLat, viewPosition.zoom);
    },
  },
  methods: {
    removeMapBoxLinks() {
      var elements = document
        .getElementsByClassName("mapboxgl-ctrl-attrib-inner")[0]
        .getElementsByTagName("a");
      for (let i = 0; i < elements.length; i++) {
        elements[i].removeAttribute("href");
      }
      document
        .getElementsByClassName("mapboxgl-ctrl-logo")[0]
        .removeAttribute("href");
    },
    insertCustomMarker(marker) {
      var el = document.createElement("div");

      if (marker.img) el.style.backgroundImage = "url(" + marker.img + ")";

      el.style.width = marker.size.width + "px";
      el.style.height = marker.size.height + "px";

      if (marker.innerHTML) el.innerHTML = marker.innerHTML;
      if (marker.id) el.id = marker.id;

      el.classList.add("marker-visibility");

      var self = this;
      el.onclick = function (e) {
          self.$emit("customMarkerClick", marker);
          e.stopPropagation();
      };

      var mapBoxMarker = new mapboxgl.Marker(el);
      mapBoxMarker.setLngLat(marker.coordinates);
      mapBoxMarker.setOffset([0, -marker.size.height / 2]);
      mapBoxMarker.addTo(this.map);

      this.markersOnMap.push(mapBoxMarker);
    },
    removeMarkers() {
      this.markersOnMap.forEach((m) => {
        m.remove();
      });
      this.markersOnMap = [];
    },
    updateMarkersVisibility() {
      var zoom = this.map.getZoom();
      this.customMarkers.forEach((marker) => {
        if (marker.id) {
          var htmlMarker = document.getElementById(marker.id);
          if (
            (marker.maxZoom && marker.maxZoom < zoom) ||
            (marker.minZoom && marker.minZoom > zoom)
          ) {
            htmlMarker.classList.add("hidden");
          } else {
            htmlMarker.classList.remove("hidden");
          }
        }
      });
    },
    setView(lngLat, zoom) {
      var currentZoom = this.map.getZoom();
      this.map.flyTo({
        // These options control the ending camera position: centered at
        // the target, at zoom level 9, and north up.
        center: lngLat,
        zoom: currentZoom < zoom ? zoom : currentZoom,
        bearing: 0,
        speed: 1.2, // make the flying slow
        curve: 1, // change the speed at which it zooms out

        // This can be any easing function: it takes a number between
        // 0 and 1 and returns another number between 0 and 1.
        easing: function (t) {
          return t;
        },

        // this animation is considered essential with respect to prefers-reduced-motion
        essential: true,
      });
    },
  },
};
</script>
<style src='@/styles/mapbox-gl.css'></style>
<style>
.map-container {
  width: 100%;
  height: 100%;
}

/* elements added by mapbox */
.mapboxgl-canvas {
  outline: none;
}

.mapbox-improve-map {
  display: none;
}

.marker-visibility{
  opacity: 1;
  visibility: visible;
  transition: opacity 1s;
}
.marker-visibility.hidden{
  opacity: 0;
  visibility: hidden;
}
</style>