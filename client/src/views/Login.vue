<template>
  <div>
    <form>
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit" @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { login } from "../services/requests";

export default Vue.extend({
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const res = await login({ email: this.email, password: this.password });

      this.$store.commit("setToken", res.data.token);
      this.$store.commit("setUser", res.data.user);
      this.$router.push("/");
    },
  },
});
</script>

<style scoped lang="scss">
div {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
