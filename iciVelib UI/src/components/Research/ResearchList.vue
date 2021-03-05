<template>
  <v-card v-if="items && items.length > 0">
    <v-list dense>
      <v-list-item
        v-for="(item, index) in items"
        :key="item.id"
        link
        three-line
        @click="onItemClick(item)"
      >
        <v-list-item-content>
          <v-list-item-title>{{ item.place_name }}</v-list-item-title>
          <v-list-item-subtitle>
            {{ item.place_name }}
          </v-list-item-subtitle>
          <v-divider v-if="index < items.length -1"/>
        </v-list-item-content>
         
      </v-list-item>
     
    </v-list>
  </v-card>
</template>
<script>
export default {
  name: "ResearchList",
  props: {
    items: Array,
  },
  methods: {
    onItemClick(item) {
      this.$emit("itemClick", {
        placeName: item.place_name,
        coordinates: item.center,
      });
    },
  },
};
</script>