<template>
  <div>
    <h1>Respond to feedback</h1>
    <h3>Feedback ID: {{ id }}</h3>
    <h3>Submission:</h3>
    <p>{{ feedback.content }}</p>
    <h3>Input your response below:</h3>
    <input
      class="responsearea"
      id="responseContent"
      v-model="content"
      placeholder="Enter your response"
    />
    <button @click="respond()">Submit</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getFeedbackById } from "../services/requests";
import { submitResponse } from "../services/requests";
export default Vue.extend({
  name: "FeedbackRespond",
  props: {
    id: String,
  },
  data() {
    return {
      feedback: {} as any,
      content: "",
    };
  },
  mounted() {
    getFeedbackById(+this.id).then((res) => {
      this.feedback = res;
    });
  },
  methods: {
    respond() {
      submitResponse(
        {
          response: this.content,
          feedback_id: +this.id,
        },
        {
          token: this.$store.state.token,
        }
      );
      alert("Response sent!");
      this.content = "";
    },
  },
});
</script>

<style lang="scss" scoped>
.responsearea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}
</style>
