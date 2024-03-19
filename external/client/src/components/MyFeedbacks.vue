<template>
  <div>
    <p>Submission title: {{ feedback.title }}</p>
    <button @click="viewFeedback">View</button>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  name: "MyFeedbacks",
  props: {
    feedback: Object
  },
  setup(props: any){
    const router = useRouter();

    function viewFeedback() {
      router.push("feedback-history/" + props.feedback.id);
    }
    
    return {
      viewFeedback
    }
  }
}
</script>

<style scoped></style>
