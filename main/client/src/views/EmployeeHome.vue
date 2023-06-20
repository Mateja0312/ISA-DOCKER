<template>
  <div class="dashboard">
    <homepage-image
      id="requests"
      img="schedule.jpg"
      :page="'center/' + user.employedAt"
      title="Center"
    />
    <homepage-image
      id="requests"
      img="No-Image-Placeholder.jpg"
      page="appointments"
      title="Appointments"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import HomepageImage from "../components/HomepageImage.vue";

export default Vue.extend({
  name: "AdminHome",
  components: {
    HomepageImage,
  },
  computed: {
    ...mapState(["user"]),
  },
});
</script>

<style scoped lang="scss">
.homepage-image {
  width: calc(100% / 2);
  height: 100vh;
  float: left;
}
</style>
