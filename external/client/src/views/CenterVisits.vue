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
import { useStore } from 'vuex';
import { ref } from 'vue';
import { onMounted } from 'vue'

export default {
  name: "CenterVisits",
  components: { CenterVisit },
  setup(){
    const appointments = ref([] as any);
    const filteredAppointments = ref([] as any);
    const dateSort = ref(true);
    const lengthSort = ref(false);
    const filterFlag = ref(true);
    const orderDate = ref('asc');
    const orderLength = ref('asc');
    const filterValue = ref('Pending');

    onMounted(() => {

      const store = useStore();
      getCompletedAndPendingAppointments({ token: store.state.token }).then(
        (res: any) => {
          appointments.value = res;
          for (var a in appointments.value) {
            appointments.value[a].startTimeInSeconds = new Date(
              appointments.value[a].start
            ).getTime();
            appointments.value[a].lengthInSeconds =
              new Date(appointments.value[a].end).getTime() -
              appointments.value[a].startTimeInSeconds;
          }
          filteredAppointments.value = appointments.value.filter(
            (a: any) => a.status != "completed"
          );
        }
      );
    })

    function sortByStart() {
      if (!dateSort.value) {
        dateSort.value = true;
        lengthSort.value = false;
      } else {
        orderDate.value = orderDate.value == "asc" ? "desc" : "asc";
      }
      filteredAppointments.value = filteredAppointments.value.sort(
        (a: any, b: any) => {
          return (
            (a.startTimeInSeconds - b.startTimeInSeconds) *
            (orderDate.value == "asc" ? 1 : -1)
          );
        }
      );
    }

    function sortByLength() {
      if (!lengthSort.value) {
        dateSort.value = false;
        lengthSort.value = true;
      } else {
        orderLength.value = orderLength.value == "asc" ? "desc" : "asc";
      }
      filteredAppointments.value = filteredAppointments.value.sort(
        (a: any, b: any) => {
          return (
            (a.lengthInSeconds - b.lengthInSeconds) *
            (orderLength.value == "asc" ? 1 : -1)
          );
        }
      );
    }

    function filter() {
      filterFlag.value = !filterFlag.value;
      if (!filterFlag.value) {
        filteredAppointments.value = appointments.value.filter(
          (a: any) => a.status == "completed"
        );
        filterValue.value = "Completed";
      } else {
        filteredAppointments.value = appointments.value.filter(
          (a: any) => a.status != "completed"
        );
        filterValue.value = "Pending";
      }
    }

    return {
      appointments,
      filteredAppointments,
      dateSort,
      lengthSort,
      filterFlag,
      orderDate,
      orderLength,
      filterValue,
      onMounted,
      sortByStart,
      sortByLength,
      filter
    };
  },
  
  methods: {

  },
}
</script>

<style scoped>
.bold {
  font-weight: bold;
}
#page {
  padding: 30px;
}
</style>
