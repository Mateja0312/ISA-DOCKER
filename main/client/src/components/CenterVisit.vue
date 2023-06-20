<template>
  <div>
    <h2>Center name: {{ appointment.center.name }}</h2>
    <p>Date: {{ appointment.start.split("T")[0] }}</p>
    <p>
      Appointment time: {{ appointment.start.split("T")[1].split(":")[0] }}:{{
        appointment.start.split("T")[1].split(":")[1]
      }}
      - {{ appointment.end.split("T")[1].split(":")[0] }}:{{
        appointment.end.split("T")[1].split(":")[1]
      }}
    </p>
    <img
      :src="'http://localhost:3000/appointment-' + appointment.id + '.png'"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "CenterVisit",
  props: {
    appointment: Object,
  },
});
</script>

<style lang="scss" scoped></style>
