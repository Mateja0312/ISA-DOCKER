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
import { ref } from 'vue';
import { onMounted } from 'vue'
import { useStore } from 'vuex';

export default {
  components: { MyFeedbacks },
  name: "FeedbackHistory",
  setup(){
    const store = useStore();

    const myFeedbacks = ref([]);

    onMounted(() => {
      myFeedbackHistory({ token: store.state.token }).then((res) => {
        myFeedbacks.value = res;
      });
    })

    return {
      onMounted,
      myFeedbacks
    }
  }
}
</script>

<style scoped></style>
