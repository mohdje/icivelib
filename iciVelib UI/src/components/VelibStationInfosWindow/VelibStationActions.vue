<template>
  <div class="actions-container">
    <v-btn
      v-for="action in actions"
      :key="action.icon"
      rounded
      color="white"
      style="margin: 0 4px; border: 2px solid #bbbbbbab !important;"
      elevation="0"
      v-delay-click="action.onClick"
    >
      <v-icon :color="action.color">{{ action.icon }}</v-icon>
      <span style="margin-left: 3px">{{ action.label }}</span>
    </v-btn>
    <YesNoDialog
      :visible="yesNoDialog.visible"
      :title="yesNoDialog.title"
      :text="yesNoDialog.text"
      @yesClick="yesNoDialog.onYesClick"
      @noClick="yesNoDialog.onNoClick"
    />
    <InputTextDialog 
      :visible="inputTextDialog.visible"
      :title="inputTextDialog.title"
      :text="inputTextDialog.text"
      :placeHolder="inputTextDialog.placeHolder"
      @validateClick="inputTextDialog.onValidateClick"
      @cancelClick="inputTextDialog.onCancelClick"
    />
  </div>
</template>
<script>
import YesNoDialog from "@/components/Dialogs/YesNoDialog";
import InputTextDialog from "@/components/Dialogs/InputTextDialog";
import { ObjectAccessor } from "@/js/objectAccessor.js";

export default {
  components: {
    YesNoDialog,
    InputTextDialog
  },
  mounted() {
    ObjectAccessor.add("VelibStationComponent", this);
  },
  data: () => ({
    yesNoDialog: {
      visible: false,
      title: "",
      text: "",
      onYesClick() {},
      onNoClick() {},
    },
    inputTextDialog: {
      visible: false,
      title: "",
      text: "",
      placeHolder: "Station devant le bureau",
      onValidateClick() {},
      onCancelClick() {},
    },
    
    actions: [
      {
        icon: "mdi-directions",
        color: "secondary",
        label: " Y aller",
        onClick() {
          var thisVueComponent = ObjectAccessor.get("VelibStationComponent");
          thisVueComponent.raiseGoToClick();
        },
      },
      {
        icon: "mdi-star-circle",
        color: "red",
        label: "Favoris",
        onClick() {          
          var thisVueComponent = ObjectAccessor.get("VelibStationComponent");
          thisVueComponent.showYesNoDialog(
            "Favoris",
            "Voulez-vous enregistrer cette station Velib dans vos favoris ?",
             () => {
              thisVueComponent.closeYesNoDialog();
              thisVueComponent.showInputVelibStationLabelDialog(
                "Favoris", 
                "Vous pouvez ajouter un label personnalisé pour reconnaître plus facilement votre station",
                (inputText) => {thisVueComponent.raiseAddToFavClick(inputText); thisVueComponent.closeInputVelibStationLabelDialog(); },
                () => { thisVueComponent.closeInputVelibStationLabelDialog();}
                );             
            },
             () => {
              thisVueComponent.closeYesNoDialog();
            }
          );
        },
      },
    ],
  }),
  methods: {
    showYesNoDialog(title, text, onYesCallback, onNoCallback) {
      this.yesNoDialog.title = title;
      this.yesNoDialog.text = text;
      this.yesNoDialog.onYesClick = () => {
        onYesCallback();
      };
      this.yesNoDialog.onNoClick = () => {
        onNoCallback();
      };
      this.yesNoDialog.visible = true;
    },
    closeYesNoDialog() {
      this.yesNoDialog.visible = false;
    },
    showInputVelibStationLabelDialog(title, text, validateCallback, cancelCallback){
      this.inputTextDialog.title = title;
      this.inputTextDialog.text = text;
      this.inputTextDialog.onValidateClick = (inputText) => {
        validateCallback(inputText);
      };
      this.inputTextDialog.onCancelClick = () => {
        cancelCallback();
      };
      this.inputTextDialog.visible = true;
    },
     closeInputVelibStationLabelDialog() {
      this.inputTextDialog.visible = false;
    },
    raiseGoToClick() {
      this.$emit("onGoToClick");
    },
    raiseAddToFavClick(inputText) {
      this.$emit("onAddToFavClick", inputText);
    },
  },
};
</script>
<style>
.actions-container {
  padding: 7px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>