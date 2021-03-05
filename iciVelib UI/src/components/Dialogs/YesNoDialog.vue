<template>
  <v-dialog :value="showDialog" max-width="290" @click:outside="onNoClick">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="secondary" text v-delay-click="onNoClick"> Non </v-btn>
        <v-btn color="secondary" elevation="0" v-delay-click="onYesClick"> Oui </v-btn>
      
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: "YesNoDialog",
  props: {
    title: String,
    text: String,
    visible: Boolean,
  },
  computed: {
    showDialog() {
      return this.visible;
    },
  },
  methods: {
    onYesClick() {
      this.$emit("yesClick");
    },
    onNoClick() {
      this.$emit("noClick");
    },
  },
};
</script>
<style>
</style>