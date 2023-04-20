<template>
  <div>
    <main>
      <h1>Welcome</h1>
      <h2>
        New around here?
        <router-link to="/registration">Sign up</router-link> now, <br />
        or start <router-link to="/centers">browsing</router-link>.
      </h2>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Landing",
  props: {},
});
</script>

<style scoped lang="scss">
div {
  position: relative;
  height: 100vh;
  background-image: url("../assets/home_screen.jpg");
  background-position: -20%;
  background-size: 100%;
  background-repeat: no-repeat;
  box-shadow: inset 0px 110px 90px rgba(0, 0, 0, 0.5);

  main {
    position: fixed;
    top: 50%;
    left: 10%;
    color: white;
    font-family: "Times New Roman";
    h1 {
      font-size: 96px;
    }
    h2 {
      font-size: 36px;
      a {
        color: rgb(103, 188, 214);
        text-decoration: underline;
      }
    }
  }
}
</style>
