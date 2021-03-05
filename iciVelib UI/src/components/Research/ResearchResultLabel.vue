<template>
  <transition name="slide-from-top">
    <div class="research-result-label-container" v-if="visible">
      <div class="research-result-label">{{ text }}</div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "ResearchResultLabel",
  props: {
    text: String,
    visible: Boolean
  },
};
</script>
<style>
.research-result-label-container {
  width: 100%;
  top: 70px;
  position: absolute;
}

.research-result-label {
  width: 65%;
  margin: 5px auto;
  background-color: #3498db;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  text-align: center;
}
</style>