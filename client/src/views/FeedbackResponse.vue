<template>
  <div v-if="response">
    <h2>Submitted by (id): {{ response.feedback.client_id }}</h2>
    <h2>Feedback:</h2>
    <p>{{ response.feedback.content }}</p>
    <h2>Response</h2>
    <p>{{ response.response }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getMyResponses } from "../services/requests";
export default Vue.extend({
  name: "FeedbackResponse",
  props: {
    id: String,
  },
  data() {
    return {
      response: null as any,
    };
  },
  mounted() {
    getMyResponses(+this.id).then((res: any) => {
      this.response = res;
    });
  },
});
</script>

<style lang="scss" scoped></style>
