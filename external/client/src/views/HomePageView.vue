<template>
  <div id="home">
    <HomepageImage
      id="center-visits"
      img="files.jpg"
      page="center-visits"
      title="MY APPOINTMENTS"
    />
    <HomepageImage
      id="feedback"
      img="complaint.jpeg"
      page="feedback"
      title="FEEDBACK"
    />
  </div>
</template>

<script setup lang="ts">
import HomepageImage from "@/components/HomepageImage.vue";
</script>

<style>
#home {
  display: flex;
  height: 100vh;
}

#home .homepage-image {
  width: calc(100vw / 2);
  height: 100%;
}

#home #questionnaire img {
  object-position: 70%;
}
</style>
