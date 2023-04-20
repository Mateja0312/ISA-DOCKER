<template>
  <div>
    <p>Scheduled at: {{ prettyDateTime }}</p>
    <img
      :src="'http://localhost:3000/appointment-' + appointment.id + '.png'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "QRcode",
  props: {
    appointment: Object,
  },
  computed: {
    prettyDateTime(): any {
      return new Date(this.appointment.start).toLocaleString("en-GB");
    },
  },
});
</script>

<style lang="scss" scoped></style>
