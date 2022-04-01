<template>
  <div class="research-view-header">
    <div class="research-parameters">
      <v-btn color="primary" fab small v-delay-click="onFilterClick">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        v-delay-click="showSupportDialog"
        style="margin-top: 5px"
      >
        <v-icon>mdi-thumb-up</v-icon>
      </v-btn>
    </div>
    <div class="research-input">
      <v-text-field
        solo
        prepend-inner-icon="mdi-map-marker"
        placeholder="Ville, Adresse..."
        clearable
        :value="locationSelected"
        @input="onTextChanged"
      ></v-text-field>
      <div class="research-list-result">
        <ResearchList
          :items="researchResults"
          @itemClick="onLocationSelected"
        />
      </div>
    </div>
    <div class="research-parameters">
      <v-btn
        color="secondary"
        fab
        small
        secondary
        v-delay-click="onGeolocationClick"
      >
        <v-icon>mdi-map-marker-radius</v-icon>
      </v-btn>
      <v-btn
        v-if="showFavoritesButton"
        color="accent"
        fab
        small
        secondary
        v-delay-click="onFavoritesClick"
        style="margin-top: 5px"
      >
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </div>
    <YesNoDialog
      :visible="supportDevDialogVisible"
      :title="'Supporter'"
      :text="'Afin d\'aider le développeur à maintenir cette application gratuitement, vous pouvez regarder une publicité de quelques secondes de temps en temps. Souhaitez-vous regarder une publicité ?'"
      @yesClick="onAdSupportAgreed"
      @noClick="supportDevDialogVisible = false"
    />
  </div>
</template>
<script>
import { Geocoding } from "@/js/geocoding.js";
import ResearchList from "@/components/Research/ResearchList";
import YesNoDialog from "@/components/Dialogs/YesNoDialog.vue";

export default {
  name: "ResearchHeader",
  components: {
    ResearchList,
    YesNoDialog,
  },
  props: {
    showFavoritesButton: Boolean,
  },
  data() {
    return {
      researchResults: [],
      locationSelected: "",
      supportDevDialogVisible: false,
    };
  },
  methods: {
    onFilterClick() {
      this.$emit("filterClick");
    },
    onTextChanged(text) {
      if (text) {
        var self = this;
        Geocoding.adressToGeocode(text, function (result) {
          self.researchResults = result.features;
        });
      } else this.researchResults = [];
    },
    onGeolocationClick() {
      this.$emit("geolocationClick");
    },
    onFavoritesClick() {
      this.$emit("favoritesClick");
    },
    onLocationSelected(location) {
      this.locationSelected = location.placeName;
      this.researchResults = [];
      this.$emit("locationSelected", location.coordinates);
    },
    onAdSupportAgreed() {
      this.supportDevDialogVisible = false;
      this.$emit("showAd");
    },
    showSupportDialog(){
      this.supportDevDialogVisible = true;
    }
  },
};
</script>
<style>
.research-view-header {
  width: 100%;
  top: 10px;
  position: absolute;
  display: flex;
}

.research-parameters {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3px;
  width: 15%;
}

.research-input {
  width: 70%;
}

.research-list-result {
  position: relative;
  top: -27px;
}
</style>