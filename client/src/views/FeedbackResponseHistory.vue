<template>
  <div>
    <h1>My response history</h1>
    <myResponses
      v-for="response in myResponses"
      :key="response.id"
      :response="response"
    />
  </div>
</template>

<script>
import FeedbacksPending from "../components/FeedbacksPending.vue";
import myResponses from "../components/MyResponses.vue";
import { myFeedbackHistory, myResponseHistory } from "../services/requests";
import Vue from "vue";
export default Vue.extend({
  components: { myResponses },
  name: "FeedbackResponseHistory",
  data() {
    return {
      myResponses: [],
    };
  },
  mounted() {
    myResponseHistory({ token: this.$store.state.token }).then((res) => {
      this.myResponses = res;
    });
  },
});
</script>

<style lang="scss" scoped></style>
