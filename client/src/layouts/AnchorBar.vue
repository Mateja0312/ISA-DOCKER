<template>
  <div>
    <header>
      <nav>
        <router-link to="/">
          <img
            src="../assets/real-red-blood-drop-clip-art-clkerm-vector-clip-0.png"
          />
        </router-link>
        <div id="links">
          <router-link to="/profile" v-if="isLoggedIn">Profile</router-link>
          <router-link to="/login" v-if="!isLoggedIn">Sign In</router-link>
          <a href="/" v-if="isLoggedIn" @click.prevent="logout">Sign Out</a>
          <router-link to="/registration" v-if="!isLoggedIn"
            >Sign Up</router-link
          >
        </div>
      </nav>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";

export default Vue.extend({
  name: "AnchorBar",
  props: {},
  computed: {
    ...mapGetters(["isLoggedIn", "isClient"]),
  },
  methods: {
    logout() {
      this.$emit("requestLogout");
    },
  },
});
</script>

<style scoped lang="scss">
nav {
  width: 100vw;
  position: fixed;
  z-index: 1;
  pointer-events: none;

  color: white;

  a {
    pointer-events: auto;
  }

  #links {
    position: absolute;
    top: 50%;
    right: 5%;
    font-size: 24px;
    color: red;
    display: flex;
    gap: 20px;
  }
  img {
    margin-top: 20px;
    height: 75px;
    width: auto;
    position: relative;
    left: 50vw;
    transform: translateX(-50%);
  }
}
</style>
