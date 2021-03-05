<template>
  <v-btn
    color="white"
    fab
    small
    secondary
    v-delay-click="onReloadClick"
    class="reload-view-button"
  >
    <v-icon color="primary">mdi-reload</v-icon>
  </v-btn>
</template>
<script>
export default {
  name: "ReloadViewButton",
  methods: {
    onReloadClick() {
      this.$emit("click");
      location.reload();
    },
  },
};
</script>
<style>
.reload-view-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
}
</style>