<template>
  <v-navigation-drawer
    v-model="panelVisible"
    absolute
    temporary
    style="z-index: 20"
    touchless
  >
    <div class="filter-panel-container">
      <div class="filter-panel-header">
        <v-list-item>
          <v-list-item-avatar>
            <v-icon color="white">mdi-filter</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title style="color: white"
              >Filtres de recherche</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </div>
      <div class="filter-content">
        <v-list-item-content>
          <v-list-item-title style="text-align: center"
            >Distance max : {{ distanceMaxLabel }}</v-list-item-title
          >
          <v-slider
            v-model="filterValues.distanceMax"
            color="primary"
            min="0.1"
            max="10"
            step="0.1"
          ></v-slider>
        </v-list-item-content>

        <v-list-item-content style="position: relative; top: -40px">
          <v-divider></v-divider>
          <v-list-item-title
            style="
              white-space: normal;
              text-align: center;
              padding-left: 10px;
              margin-top: 20px;
            "
          >
            Afficher uniquement les stations avec des
          </v-list-item-title>
          <v-list dense>
            <v-list-item
              v-for="item in filterValues.shouldMatch"
              :key="item.title"
              style="padding-right: 0"
            >
              <v-list-item-content>
                <div class="match-value-list">
                  <v-list-item-title>{{ item.label }}</v-list-item-title>
                  <v-switch
                    style="padding-right: 10px; margin-top: 0"
                    v-model="item.value"
                    color="secondary"
                    hide-details
                  ></v-switch>
                </div>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-content>
      </div>
    </div>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "ResearchFilter",
  props: {
    isVisible: Boolean,
    filterValues: Object,
  },
  data() {
    return {
      panelVisible: false
    };
  },
  watch: {
    isVisible(value) {
      this.panelVisible = value;
    },
    panelVisible(value) {
      if (value) this.$emit("onResearchFilterOpen");
      else this.$emit("onResearchFilterClose");
    },
  },
  computed: {
    distanceMaxLabel() {
      if (this.filterValues && this.filterValues.distanceMax < 1)
        return this.filterValues.distanceMax * 1000 + " m";
      else return this.filterValues.distanceMax + " km";
    },
  }
};
</script>
<style>
.filter-panel-container {
   display: flex;
  flex-direction: column;
  height: 100%;
}

.filter-panel-header {
  background-color: #a2b43a;
}

.filter-content {
  overflow: scroll;
  flex-grow: 2000;
}

.match-value-list {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
