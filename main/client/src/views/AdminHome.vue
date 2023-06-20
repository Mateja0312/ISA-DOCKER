<template>
  <div class="dashboard">
    <homepage-image
      id="requests"
      img="No-Image-Placeholder.jpg"
      page="boats"
      title="Register New User"
    />
    <homepage-image
      id="requests"
      img="No-Image-Placeholder.jpg"
      page="boats"
      title="Register New Center"
    />
    <homepage-image
      id="feedback-response"
      img="complaint.jpeg"
      page="feedback-response"
      title="User Feedback"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HomepageImage from "../components/HomepageImage.vue";

export default Vue.extend({
  name: "AdminHome",
  components: {
    HomepageImage,
  },
});
</script>

<style scoped lang="scss">
.homepage-image {
  width: calc(100% / 3);
  height: calc(100vh);
  float: left;
}
</style>
