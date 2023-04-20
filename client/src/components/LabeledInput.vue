<template>
  <div class="labeled-input">
    <label :for="idValue"> {{ labelValue }} </label>
    <input :id="idValue" :type="typeValue" @input="updateValue" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "LabeledInput",
  props: {
    modelValue: String,
    labelValue: String,
    typeValue: String,
    idValue: String,
  },
  methods: {
    updateValue(event: any) {
      this.$emit("input", event.target.value);
    },
  },
});
</script>

<style scoped lang="scss">
input {
  margin: 5px;
}
</style>
