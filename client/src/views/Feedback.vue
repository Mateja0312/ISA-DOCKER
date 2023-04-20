<template>
  <div v-if="myInteractions">
    <div v-if="myInteractions.centers.length != 0" class="feedback">
      <button @click="mySubmissions">My Submissions</button>

      <p>What is this complaint about?</p>
      <button @click="modifyComplaintType" v-if="showEmployee">Employee</button>
      <button @click="modifyComplaintType" v-if="!showEmployee">Center</button>

      <label for="employee-names" v-if="showEmployee"
        >Choose the employee:</label
      >
      <select
        name="employee-names"
        id="employee-names"
        v-if="showEmployee"
        v-model="employeeIdValue"
      >
        <option
          v-for="employee in this.myInteractions.employees"
          :key="employee.id"
          :value="employee.id"
        >
          {{ employee.firstName }} {{ employee.lastName }}
        </option>
      </select>

      <label for="center-names" v-if="!showEmployee">Choose the center:</label>
      <select
        name="center-names"
        id="center-names"
        v-if="!showEmployee"
        v-model="centerIdValue"
      >
        <option
          v-for="center in this.myInteractions.centers"
          :key="center.id"
          :value="center.id"
        >
          {{ center.name }} ({{ center.address }})
        </option>
      </select>

      <p>Title:</p>
      <input
        class="title"
        id="feedbackTitle"
        v-model="title"
        placeholder="Title your submission"
      />
      <p>Input your feedback below:</p>
      <input
        class="textarea"
        id="feedbackContent"
        v-model="content"
        placeholder="Enter your feedback"
      />
      <button @click="onSubmit">Submit</button>
    </div>
    <div v-if="myInteractions.centers.length == 0">
      <p>You cannot submit feedback without a completed appointment.</p>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { submitFeedback, getMyInteractions } from "../services/requests";

export default Vue.extend({
  name: "Feedback",
  data() {
    return {
      title: "",
      content: "",
      myInteractions: null,
      showEmployee: true,
      employeeIdValue: null,
      centerIdValue: null,
      feedbacks: [],
    };
  },
  mounted() {
    getMyInteractions({ token: this.$store.state.token }).then((res) => {
      this.myInteractions = res;
    });
  },
  methods: {
    onSubmit() {
      submitFeedback(
        {
          title: this.title,
          content: this.content,
          employee_id: this.employeeIdValue,
          center_id: this.centerIdValue,
        },
        {
          token: this.$store.state.token,
        }
      );
      alert("Submission completed!");
      this.title = "";
      this.content = "";
      this.centerIdValue = "";
      this.employeeIdValue = "";
    },
    modifyComplaintType() {
      this.showEmployee = !this.showEmployee;
      if (this.showEmployee) this.centerIdValue = null;
      else this.employeeIdValue = null;
    },
    mySubmissions() {
      this.$router.push("feedback-history");
    },
  },
});
</script>

<style lang="scss" scoped>
html,
body {
  height: 100%;
}

.feedback {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 10%;

  .textarea {
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    resize: none;
  }
  .title {
    width: 100%;
    padding: 12px 20px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    background-color: #f8f8f8;
    resize: none;
  }
  .visible {
    display: block;
  }

  .hidden {
    display: none;
  }
}
</style>
