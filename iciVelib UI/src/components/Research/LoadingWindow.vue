<template>
  <v-dialog v-model="showDialog" persistent width="fit-content" no-click-animation>
    <v-card color="secondary">
      <div class="loading-window-container">
        <div class="loading-view-label">{{ label }}</div>
        <v-progress-circular            
          indeterminate
          color="white"
        ></v-progress-circular>
      </div>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "LoadingWindow",
  props: {
    isVisible: Boolean,
    label: String,
  },
  data() {
    return {
      showDialog: false,
    };
  },
  watch:{
      isVisible(visible){
          this.showDialog = visible;         
      }
  }
};
</script>
<style>
.loading-window-container{
    padding: 15px;
    width: fit-content;
    text-align: center;
    max-width: 250px;
    font-size: medium;
    font-weight: bold;
}

.loading-view-label{
    margin-bottom: 10px;
    color: white;
}
</style>