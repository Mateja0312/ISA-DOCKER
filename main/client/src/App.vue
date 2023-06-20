<template>
  <div id="app">
    <component :is="layout" @requestLogout="logout">
      <router-view @requestLogout="logout" @requestLayout="setLayout" />
    </component>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Navbar from "./layouts/Navbar.vue";
import AnchorBar from "./layouts/AnchorBar.vue";

export default Vue.extend({
  name: "App",
  components: {
    Navbar,
    AnchorBar,
  },
  data() {
    return {
      layout: "anchor-bar",
    };
  },
  methods: {
    setLayout(event: any) {
      console.log(event);
    },
    logout() {
      this.$store.commit("setToken", null);
      this.$store.commit("setUser", { role: "" });
      if (this.$route.name != "Home") this.$router.push("/");
    },
  },
});
</script>

<style lang="scss">
#app {
  font-family: "Times New Roman";
  margin: 0;
}
body,
html {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}
</style>
