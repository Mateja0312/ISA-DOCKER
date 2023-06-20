<template>
  <div id="centers-page">
    <form>
      <label for="date">Date: </label>
      <input id="date" type="datetime-local" v-model="datetime" />
      <label for="name">Name: </label>
      <input v-model="name" id="name" />
      <label for="address">Address: </label>
      <input v-model="address" id="address" />
      <label for="rating">Rating >= </label>
      <input v-model="rating" id="rating" type="number" />
      <button @click.prevent="rotateSort">sort</button>
      <button @click.prevent="search">search</button>
    </form>
    <section>
      <search-result
        v-for="center in sortedCenters"
        :key="center.id"
        :center="center"
      ></search-result>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import SearchResult from "../components/SearchResult.vue";
import { getCenters } from "../services/requests";

export default Vue.extend({
  components: { SearchResult },
  name: "CenterSearch",
  data() {
    return {
      name: null,
      address: null,
      rating: null,
      datetime: null,
      centers: [] as any[],
      sort: null as "asc" | "desc" | null,
    };
  },
  mounted() {
    getCenters({ token: this.$store.state.token }).then((res) => {
      this.centers = res;
    });
  },
  computed: {
    sortedCenters(): Array<any> {
      if (this.sort === null) {
        return this.centers;
      }
      return [...this.centers].sort((a, b) => {
        if (this.sort === "asc") {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
    },
  },
  methods: {
    search() {
      getCenters({
        name: this.name,
        address: this.address,
        rating: this.rating,
        datetime: this.datetime,
        token: this.$store.state.token,
      }).then((res) => {
        this.centers = res;
      });
    },
    rotateSort() {
      if (this.sort === null) {
        this.sort = "asc";
      } else if (this.sort === "asc") {
        this.sort = "desc";
      } else {
        this.sort = null;
      }
    },
  },
});
</script>

<style scoped lang="scss">
#centers-page {
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0%;
  left: 0%;
  background-image: url("../assets/home_screen.jpg");
  background-position: -20%;
  background-size: cover;
  color: white;

  padding-top: 120px;
  section,
  nav {
    width: fit-content;
  }
}
</style>
