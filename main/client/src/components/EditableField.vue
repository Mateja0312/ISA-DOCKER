<template>
  <div class="editable-field">
    <label>{{ label }}: </label>
    <button @click="toggleEdit()" class="pr-3">
      {{ editing ? "💾" : "✏️" }}
    </button>
    <input
      :disabled="!editing"
      @change="$emit('update:text', localText)"
      v-model="localText"
      :size="localText.length * 0.7"
      :class="{ editable: editing }"
      class="p-1"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "EditableField",
  props: { text: String, label: String },
  data() {
    return {
      editing: false,
      localText: this.text,
    };
  },
  methods: {
    toggleEdit() {
      this.editing = !this.editing;
      if (!this.editing) {
        this.$emit("save");
      }
    },
  },
});
</script>

<style scoped lang="scss">
.editable-field {
  font-size: 20px;
  input {
    background-color: rgba(0, 0, 0, 0);
    width: fit-content;
    &.editable {
      background-color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
