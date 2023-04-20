<template>
  <div>
    <p>Submission title: {{ feedback.title }}</p>
    <p>Submitted by (client_id): {{ feedback.client_id }}</p>
    <button @click="ViewFeedback">Respond</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "FeedbacksPending",
  props: {
    feedback: Object,
  },
  methods: {
    ViewFeedback() {
      this.$router.push("feedback-response/" + this.feedback.id);
    },
  },
});
</script>

<style lang="scss" scoped></style>
