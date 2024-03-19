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
import { getFeedbackById } from "../services/requests";
import {ref} from 'vue';
import { onMounted } from 'vue'

export default {
  name: "MyFeedback",
  props: {
    id: String,
  },
  setup(props: any){
  
    const feedback = ref({} as any);

    onMounted(() => {
      getFeedbackById(+props.id).then((res: any) => {
        feedback.value = res;
      });
    })

    return {
      onMounted,
      feedback
    }
  }
}
</script>

<style scoped></style>
