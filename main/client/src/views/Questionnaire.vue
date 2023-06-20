<template>
  <div id="questionnaire">
    <header>
      <h2>Questions must be answered honestly.</h2>
    </header>
    <div id="question-container" v-if="questions && myAnswers">
      <question
        v-for="(question, index) in questions"
        :key="question"
        :text="question"
        :index="index"
        v-model="myAnswers[index]"
      >
      </question>
    </div>

    <button @click="onSubmit">Submit</button>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import {
  questions,
  saveQuestionnaireInfo,
  getAnswers,
} from "../services/requests";
import question from "../components/Question.vue";

export default Vue.extend({
  components: { question },
  name: "Questionnaire",
  props: {},
  data() {
    return {
      questions: [],
      myAnswers: [],
    };
  },
  async mounted() {
    this.questions = await questions();
    this.myAnswers =
      (await getAnswers({
        token: this.$store.state.token,
      })) ?? [];
  },
  methods: {
    onSubmit() {
      if (this.myAnswers.length < this.questions.length) {
        alert("Please answer all questions");
        return;
      }
      saveQuestionnaireInfo(this.myAnswers, {
        token: this.$store.state.token,
      });
      alert("Successfully submited!");
    },
  },
});
</script>

<style scoped lang="scss">
#questionnaire {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 10%;

  #question-container {
    display: flex;
    flex-direction: column;
  }
}
</style>
