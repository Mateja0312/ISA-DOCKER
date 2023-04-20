<template>
  <div class="homepage-image">
    <img :src="require('../assets/' + img)" @click="onClick" />
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HomepageImage",
  props: {
    img: String,
    page: String,
    title: String,
  },
  methods: {
    onClick() {
      this.$router.push(this.page);
    },
  },
});
</script>

<style scoped lang="scss">
div {
  position: relative;

  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
  }

  img {
    height: 100%;
    width: 100%;
    display: block;
    object-fit: cover;
    filter: grayscale(100%);
    transition: filter 1s;

    &:hover {
      filter: grayscale(0%);
      cursor: pointer;
    }
  }
}
</style>
