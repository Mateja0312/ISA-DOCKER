<template>
  <div>
    <p>Submission title: {{ feedback.title }}</p>
    <button @click="ViewFeedback">View</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "MyFeedbacks",
  props: {
    feedback: Object,
  },
  methods: {
    ViewFeedback() {
      this.$router.push("feedback-history/" + this.feedback.id);
    },
  },
});
</script>

<style lang="scss" scoped></style>
