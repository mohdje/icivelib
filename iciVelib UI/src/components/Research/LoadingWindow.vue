<template>
  <v-dialog v-model="visible" persistent width="fit-content" no-click-animation>
    <v-card color="secondary">
      <div class="loading-window-container">
        <div class="loading-view-label">{{ text }}</div>
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
  data() {
    return {
      visible: false,
      text: ""
    };
  },
  methods:{
    show(text){
      this.text = text;
      this.visible = true;
    },
    hide(){
      this.visible = false;
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