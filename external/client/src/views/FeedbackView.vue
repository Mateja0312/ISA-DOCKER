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
          v-for="employee in myInteractions.employees"
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
          v-for="center in myInteractions.centers"
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
import { submitFeedback, getMyInteractions } from "../services/requests";
import { useStore } from 'vuex';
import { ref } from 'vue';
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

export default {
  name: "FeedbackView",
  setup(){
    const router = useRouter();
    const store = useStore();

    const title = ref("");
    const content = ref("");
    const myInteractions = ref(null);
    const showEmployee = ref(true);
    const employeeIdValue = ref(null);
    const centerIdValue = ref(null);
    const feedbacks = ref([]);

    onMounted(() => {
      getMyInteractions({ token: store.state.token }).then((res) => {
        myInteractions.value = res;
      });
    })

    function onSubmit() {
      submitFeedback(
        {
          title: title.value,
          content: content.value,
          employee_id: employeeIdValue.value,
          center_id: centerIdValue.value,
        },
        {
          token: store.state.token,
        }
      );
      alert("Submission completed!");
      title.value = "";
      content.value = "";
      centerIdValue.value = "";
      employeeIdValue.value = "";
    }

    function modifyComplaintType() {
      showEmployee.value = !showEmployee.value;
      if (showEmployee.value) centerIdValue.value = null;
      else employeeIdValue.value = null;
    }

    function mySubmissions() {
      router.push("feedback-history");
    }

    return {
      title,
      content,
      myInteractions,
      showEmployee,
      employeeIdValue,
      centerIdValue,
      feedbacks,
      onMounted,
      onSubmit,
      modifyComplaintType,
      mySubmissions
    };

  }
}

</script>

<style scoped>
html,
body {
  height: 100%;
}

.feedback {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 10%;
}

.feedback .textarea {
  width: 100%;
  height: 150px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}

.feedback .title {
  width: 100%;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #f8f8f8;
  resize: none;
}

.feedback .visible {
  display: block;
}

.feedback .hidden {
  display: none;
}

</style>
