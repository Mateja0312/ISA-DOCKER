<template>
  <div id="profile">
    <header>
      <h2>Info</h2>
    </header>
    <div>
      <p>{{ user.email }}</p>
      <editable-field
        label="Name"
        id="user.firstName"
        :text.sync="user.firstName"
        @save="saveUserInfo"
      />
      <editable-field
        label="Surname"
        id="user.lastName"
        :text.sync="user.lastName"
        @save="saveUserInfo"
      />
      <p>Gender: {{ user.gender ? "Male" : "Female" }}</p>
      <editable-field
        label="Country"
        id="user.country"
        :text.sync="user.country"
        @save="saveUserInfo"
      />
      <editable-field
        label="City"
        id="user.city"
        :text.sync="user.city"
        @save="saveUserInfo"
      />
      <editable-field
        label="Address"
        id="user.address"
        :text.sync="user.address"
        @save="saveUserInfo"
      />
      <editable-field
        label="Phone"
        id="user.phone"
        :text.sync="user.phone"
        @save="saveUserInfo"
      />
      <editable-field
        label="JMBG"
        id="user.JMBG"
        :text.sync="user.JMBG"
        @save="saveUserInfo"
      />
      <editable-field
        label="Profession"
        id="user.profession"
        :text.sync="user.profession"
        @save="saveUserInfo"
      />
      <editable-field
        label="Institution"
        id="user.institution"
        :text.sync="user.institution"
        @save="saveUserInfo"
      />
      <p v-if="user.role == 'client'" style="color: red">
        Penalty points: {{ user.penalties }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import EditableField from "../components/EditableField.vue";
import { updateClientInfo } from "../services/requests";

export default Vue.extend({
  components: { EditableField },
  name: "Profile",
  props: {},
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    saveUserInfo() {
      this.$store.commit("setUser", this.user);
      updateClientInfo(this.user);
    },
  },
});
</script>

<style scoped lang="scss">
#profile {
  padding: 50px;
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 10%;

  .btn {
    @apply font-bold py-1 px-3 rounded;
    position: fixed;
    bottom: 10%;
    right: 10%;
  }
  .btn-red {
    @apply bg-red-500 text-white;
  }
  .btn-red:hover {
    @apply bg-red-700;
  }

  .base {
    background: rgba(27, 27, 27, 0.65);
    color: white;
    font-family: "Times New Roman";
  }

  #header {
    @extend .base;
  }
  #card {
    @extend .base;
  }

  #info {
    @extend .base;
  }
}
</style>
