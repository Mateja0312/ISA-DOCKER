<template>
  <div>
    <form>
      <labeled-input
        id="email"
        type="email"
        labelValue="Email:"
        v-model="newUser.email"
      />

      <label for="password1">Password:</label>
      <input id="password1" type="password" v-model="newUser.password" />
      <label for="password2">Repeat Password:</label>
      <input id="password2" type="password" v-model="password2" />
      <fieldset>
        <legend>personal</legend>
        <label for="name">First Name:</label>
        <input id="name" v-model="newUser.firstName" />
        <label for="surname">Surname:</label>
        <input id="surname" v-model="newUser.lastName" />
        <label for="jmbg">JMBG:</label>
        <input id="jmbg" v-model="newUser.jmbg" />
        <input type="radio" id="male" name="gender" value="male" />
        <label for="male"> Male</label><br />
        <input type="radio" id="female" name="gender" value="female" />
        <label for="female"> Female</label><br />
      </fieldset>

      <fieldset>
        <legend>contanct</legend>
        <label for="country">Country:</label>
        <input id="country" v-model="newUser.country" />
        <label for="city">City:</label>
        <input id="city" v-model="newUser.city" />
        <label for="address">Address:</label>
        <input id="address" v-model="newUser.address" />
        <label for="phone">Phone:</label>
        <input id="phone" type="tel" v-model="newUser.phone" />
      </fieldset>

      <fieldset>
        <legend>job</legend>
        <label for="institution">institution:</label>
        <input id="institution" v-model="newUser.institution" />
        <label for="profession">profession:</label>
        <input id="profession" v-model="newUser.profession" />
      </fieldset>

      <button type="submit" @click.prevent="onSubmit">Register</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { register } from "../services/requests";
import LabeledInput from "@/components/LabeledInput.vue";

export default Vue.extend({
  name: "Registration",
  components: {
    LabeledInput,
  },
  props: {},
  data() {
    return {
      password2: "",
      newUser: {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        jmbg: "",
        gender: null,
        country: "",
        city: "",
        address: "",
        phone: "",
        profession: "",
        institution: "",
      },
    };
  },
  methods: {
    onSubmit() {
      if (this.newUser.password !== this.password2) {
        alert("Passwords do not match!");
        return;
      }
      register({
        ...this.newUser,
        role: "client",
      });
      this.$router.push("login");
    },
  },
});
</script>

<style scoped lang="scss">
form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  width: fit-content;

  input {
    margin: 5px;
  }
}
</style>
