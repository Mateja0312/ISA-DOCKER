<template>
  <div id="home">
    <homepage-image
      id="questionnaire"
      img="questionnaire.jpg"
      page="questionnaire"
      title="QUESTIONNAIRE"
    />
    <homepage-image
      id="centers"
      img="schedule.jpg"
      page="centers"
      title="SCHEDULE APPOINTMENT"
    />
    <homepage-image
      id="center-visits"
      img="files.jpg"
      page="center-visits"
      title="MY APPOINTMENTS"
    />
    <homepage-image
      id="feedback"
      img="complaint.jpeg"
      page="feedback"
      title="FEEDBACK"
    />
  </div>
</template>

<script lang="ts">
import HomepageImage from "../components/HomepageImage.vue";
import Vue from "vue";

export default Vue.extend({
  name: "ClientHome",
  components: {
    HomepageImage,
  },
});
</script>

<style lang="scss">
#home {
  display: flex;
  height: 100vh;

  .homepage-image {
    width: calc(100vw / 4);
    height: 100%;
  }

  #questionnaire img {
    object-position: 70%;
  }
}
</style>
