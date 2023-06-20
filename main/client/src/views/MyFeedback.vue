<template>
  <div>
    <h1>Feedback ID: {{ id }}</h1>
    <p>
      Date & Time of submission:
      {{ new Date(feedback.createdAt).toLocaleString("en-GB") }}
    </p>
    <h3>Title:</h3>
    <p>{{ feedback.title }}</p>
    <h3>Content:</h3>
    <p>{{ feedback.content }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getFeedbackById } from "../services/requests";
export default Vue.extend({
  name: "MyFeedback",
  props: {
    id: String,
  },
  data() {
    return {
      feedback: {} as any,
    };
  },
  mounted() {
    getFeedbackById(+this.id).then((res) => {
      this.feedback = res;
    });
  },
});
</script>

<style lang="scss" scoped></style>
