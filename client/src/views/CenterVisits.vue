<template>
  <div id="page">
    <h1>Showing {{ filterValue }} Appointments</h1>
    <button id="dateButton" :class="{ bold: dateSort }" @click="sortByStart">
      Date ({{ orderDate }})
    </button>
    <button
      id="lengthButton"
      :class="{ bold: lengthSort }"
      @click="sortByLength"
    >
      Lenght ({{ orderLength }})
    </button>
    <button @click="filter">{{ filterValue }} List</button>
    <CenterVisit
      v-for="a in filteredAppointments"
      :key="a.id"
      :appointment="a"
    />
  </div>
</template>

<script lang="ts">
import CenterVisit from "@/components/CenterVisit.vue";
import { getCompletedAndPendingAppointments } from "../services/requests";
import Vue from "vue";

export default Vue.extend({
  name: "CenterVisits",
  components: { CenterVisit },
  data() {
    return {
      appointments: [] as any,
      filteredAppointments: [] as any,
      dateSort: true,
      lengthSort: false,
      filterFlag: true,
      orderDate: "asc",
      orderLength: "asc",
      filterValue: "Pending",
    };
  },
  mounted() {
    getCompletedAndPendingAppointments({ token: this.$store.state.token }).then(
      (res) => {
        this.appointments = res;
        for (var a in this.appointments) {
          this.appointments[a].startTimeInSeconds = new Date(
            this.appointments[a].start
          ).getTime();
          this.appointments[a].lengthInSeconds =
            new Date(this.appointments[a].end).getTime() -
            this.appointments[a].startTimeInSeconds;
        }
        this.filteredAppointments = this.appointments.filter(
          (a: any) => a.status != "completed"
        );
      }
    );
  },
  methods: {
    sortByStart() {
      if (!this.dateSort) {
        this.dateSort = true;
        this.lengthSort = false;
      } else {
        this.orderDate = this.orderDate == "asc" ? "desc" : "asc";
      }
      this.filteredAppointments = this.filteredAppointments.sort(
        (a: any, b: any) => {
          return (
            (a.startTimeInSeconds - b.startTimeInSeconds) *
            (this.orderDate == "asc" ? 1 : -1)
          );
        }
      );
    },
    sortByLength() {
      if (!this.lengthSort) {
        this.dateSort = false;
        this.lengthSort = true;
      } else {
        this.orderLength = this.orderLength == "asc" ? "desc" : "asc";
      }
      this.filteredAppointments = this.filteredAppointments.sort(
        (a: any, b: any) => {
          return (
            (a.lengthInSeconds - b.lengthInSeconds) *
            (this.orderLength == "asc" ? 1 : -1)
          );
        }
      );
    },
    filter() {
      this.filterFlag = !this.filterFlag;
      if (!this.filterFlag) {
        this.filteredAppointments = this.appointments.filter(
          (a: any) => a.status == "completed"
        );
        this.filterValue = "Completed";
      } else {
        this.filteredAppointments = this.appointments.filter(
          (a: any) => a.status != "completed"
        );
        this.filterValue = "Pending";
      }
    },
  },
});
</script>

<style scoped>
.bold {
  font-weight: bold;
}
#page {
  padding: 30px;
}
</style>
