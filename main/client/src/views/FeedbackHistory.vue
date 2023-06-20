<template>
  <div>
    <h1>My feedback history</h1>
    <my-feedbacks
      v-for="feedback in myFeedbacks"
      :key="feedback.id"
      :feedback="feedback"
    />
  </div>
</template>

<script>
import FeedbacksPending from "../components/FeedbacksPending.vue";
import MyFeedbacks from "../components/MyFeedbacks.vue";
import { myFeedbackHistory } from "../services/requests";
import Vue from "vue";
export default Vue.extend({
  components: { MyFeedbacks },
  name: "FeedbackHistory",
  data() {
    return {
      myFeedbacks: [],
    };
  },
  mounted() {
    myFeedbackHistory({ token: this.$store.state.token }).then((res) => {
      this.myFeedbacks = res;
    });
  },
});
</script>

<style lang="scss" scoped></style>
