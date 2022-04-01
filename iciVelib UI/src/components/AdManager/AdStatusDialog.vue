<template>
  <v-dialog :value="visible" max-width="290" persistent>
    <v-card>
      <v-card-title> Publicité </v-card-title>
      <v-card-text v-if="status === 0">
        Chargement de la publicité en cours...
      </v-card-text>
      <v-card-text v-else-if="status === 1">
        Une erreur s'est produite lors du chargement de la publicité
      </v-card-text>
      <v-card-text v-else-if="status === 2">
        <div style="text-align: center; color: black">
          <v-icon :size="60" color="red">mdi-hand-heart</v-icon>
          <div>Merci beaucoup d'avoir regardé la publicité !</div>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      status: 0,
    };
  },
  methods: {
    showLoadingStatus() {
      this.visible = true;
      this.status = 0;
    },
    showErrorStatus() {
      this.visible = true;
      this.status = 1;
    },
    showSuccessStatus() {
      this.visible = true;
      this.status = 2;
    },
    hide() {
      this.visible = false;
    },
  },
};
</script>