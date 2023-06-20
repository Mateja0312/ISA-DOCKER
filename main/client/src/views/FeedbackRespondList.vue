<template>
  <div>
    <h1>Pending feedback list</h1>
    <button @click="Click">Response history</button>
    <feedbacks-pending
      v-for="feedback in feedbackToRespondList"
      :key="feedback.id"
      :feedback="feedback"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { getPendingFeedbacks } from "../services/requests";
import FeedbacksPending from "../components/FeedbacksPending.vue";

export default Vue.extend({
  components: { FeedbacksPending },
  name: "FeedbackRespondList",
  data() {
    return {
      feedbackToRespondList: [],
    };
  },
  mounted() {
    getPendingFeedbacks().then((res) => {
      this.feedbackToRespondList = res;
    });
  },
  methods: {
    Click() {
      this.$router.push("feedback-response-history");
    },
  },
});
</script>

<style lang="scss" scoped></style>
