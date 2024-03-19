<template>
  <div>
    <p>Submission title: {{ feedback.title }}</p>
    <p>Submitted by (client_id): {{ feedback.client_id }}</p>
    <button @click="viewFeedback">Respond</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  name: "FeedbacksPending",
  props: {
    feedback: Object
  },
  setup(props: any){
    console.log("feedbacksPending.vue props", props)
    const router = useRouter();

    function viewFeedback() {
      router.push("feedback-response/" + props.feedback.id);
    }
    
    return {
      viewFeedback
    }
  }
}

</script>

<style scoped></style>
