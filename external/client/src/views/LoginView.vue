<template>
    <h1>Login stranica</h1><div>
    <form>
      <input type="email" v-model="email" />
      <input type="password" v-model="password" />
      <button type="submit" @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<script>
import Vue from "vue";
import axios from 'axios';
import { login } from "../services/requests";
export default ({
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const res = await login({ email: this.email, password: this.password });
      // const res = await axios.post('http://localhost:9091/login', { email: this.email, password: this.password });

      this.$store.commit("setToken", res.data.token);
      this.$store.commit("setUser", res.data.user);
      this.$router.push("/home-page");
      console.log("Uloga: ", this.$store.getters.userRole)
    },
  },
});
</script>

<style>
</style>