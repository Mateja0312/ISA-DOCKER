<template>
  <div>
    <p>Topic: {{ response.feedback.title }}</p>
    <p>Submitted by (id): {{ response.feedback.client_id }}</p>
    <button @click="ViewFeedback">View</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MyResponses",
  props: {
    response: Object,
  },
  methods: {
    ViewFeedback() {
      this.$router.push("feedback-response-history/" + this.response.id);
    },
  },
});
</script>

<style lang="scss" scoped></style>
