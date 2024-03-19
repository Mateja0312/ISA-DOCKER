<template>
  <div class="homepage-image">
    <img :src="require('../assets/' + img)" @click="onClick" />
    <h1>{{ title }}</h1>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
  name: "HomepageImage",
  props: {
    img: String,
    page: String,
    title: String,
  },
  setup(props: any) {
    const router = useRouter();

    const onClick = () => {
      router.push(props.page);
    };

    return {
      onClick,
    };
  }
}
</script>

<style scoped>
div {
  position: relative;
}

div h1 {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
}

div img {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
  filter: grayscale(100%);
  transition: filter 1s;
}

div img:hover {
  filter: grayscale(0%);
  cursor: pointer;
}

</style>
