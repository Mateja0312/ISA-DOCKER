<template>
  <div class="question">
    <label>{{ index + 1 }}. {{ text }}</label>
    <div>
      <label for="yes">YES</label>
      <input
        type="radio"
        id="yes"
        :name="index.toString()"
        value="YES"
        :checked="value === 'YES'"
        @input="updateValue"
      />
      <label for="no">NO</label>
      <input
        type="radio"
        id="no"
        :name="index.toString()"
        value="NO"
        :checked="value === 'NO'"
        @input="updateValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Questions",
  props: {
    value: String,
    text: String,
    index: Number,
  },
  methods: {
    updateValue(event: any) {
      this.$emit("input", event.target.value);
    },
  },
});
</script>

<style scoped lang="scss">
.question {
  display: inline-block;
  margin: 5px;
}
</style>
