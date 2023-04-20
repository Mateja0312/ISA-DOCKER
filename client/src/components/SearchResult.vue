<template>
  <div class="center">
    <div class="center-info">
      <h2>
        <router-link :to="'/center/' + center.id">
          {{ center.name }}
        </router-link>
      </h2>
      <dl>
        <dt>Address</dt>
        <dd>{{ center.address }}</dd>
        <dt>Rating</dt>
        <dd>{{ center.rating ?? "none" }}</dd>
      </dl>
      <div class="center-controls">
        <button @click="onClick">View</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SearchResult",
  props: {
    center: Object,
  },
  methods: {
    onClick() {
      this.$router.push("center/" + this.center.id);
    },
  },
});
</script>

<style scoped lang="scss">
.center {
  display: flex;
  background-color: rgba(28, 28, 28, 0.7);
  height: 200px;
  width: 700px;
  .center-controls {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
}
</style>
