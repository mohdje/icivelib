<template>
  <v-dialog :value="showDialog" max-width="290" @click:outside="onCancelClick">
    <v-card>
      <v-card-title class="headline">
        {{ title }}
      </v-card-title>
      <v-card-text>
        {{ text }}
      </v-card-text>
      <v-text-field
        v-model="textInput"
        :placeholder="placeHolder"
        style="width: 80%; margin: 0 auto"    
        autocomplete="off"  
        maxLength="25"
        clearable
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
         <v-btn color="secondary" text v-delay-click="onCancelClick">
          Annuler
        </v-btn>
        <v-btn color="secondary" elevation="0" v-delay-click="onValidateClick">
          Valider
        </v-btn>
       
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    title: String,
    text: String,
    visible: Boolean,
    defaultTextInput: String,
    placeHolder: String
  },
  computed: {
    showDialog() {
      return this.visible;
    },
  },
  watch:{
    defaultTextInput(value){
      this.textInput = value;
    }
  },
  data() {
    return {
      textInput: "",
    };
  },
  methods: {
    onValidateClick() {
      this.$emit("validateClick", this.textInput);
      this.textInput = "";
    },
    onCancelClick() {
      this.$emit("cancelClick");
    },
  },
};
</script>