<template>
  <div id="center">
    <div id="left">
      <header>
        <h2>Info</h2>
      </header>
      <dl>
        <dt>Address</dt>
        <dd>{{ center.address }}</dd>
        <dt>Rating</dt>
        <dd>{{ center.rating ?? "none" }}</dd>
      </dl>
    </div>
    <div id="right" class="">
      <vue-scheduler
        :users="users"
        :opening-times="openingTimes"
        :events="events"
        :format="format"
        :start-date="startDate"
        :options="schedulerOptions"
        @times-selected="timesSelected"
        @event-click="eventClicked"
        class="h-24"
      />
      <div class="w-full flex justify-around p-4">
        <button @click="startDateOffset -= 7">Back</button>
        <button @click="startDateOffset += 7">Forward</button>
      </div>
    </div>
    <div v-if="showCreateModal" class="modal">
      <div class="flex flex-col items-center">
        <h1 class="m-1">Confirm appointment</h1>
        <select
          v-if="user.role === 'employee'"
          v-model="newResDoctor"
          name="doctors"
          id="doctors"
        >
          <option
            v-for="doctor in center.employees"
            :key="doctor.id"
            :value="doctor.id"
          >
            {{ doctor.id }} {{ doctor.firstName }} {{ doctor.lastName }}
          </option>
        </select>
        <br />
        {{ newResStart }} <br />
        {{ newResEnd }}
      </div>
      <div class="flex justify-between">
        <button class="bg-red-500" @click="cancelNewRes">Cancel</button>
        <button class="bg-green-500" @click="saveNewRes">Save</button>
      </div>
    </div>
    <div v-if="showAcceptModal" class="modal">
      <div>
        <p>ID: {{ activeRes.id }}</p>
        <p>Start: {{ new Date(activeRes.start) }}</p>
        <p>End: {{ new Date(activeRes.end) }}</p>
        <p v-if="selectedAppointment.employee">Doctor: {{ selectedAppointment.employee.firstName }} {{ selectedAppointment.employee.lastName }}</p>
        <p v-if="selectedAppointment.client">Client: {{ selectedAppointment.client.firstName }} {{ selectedAppointment.client.lastName }}</p>
      </div>
      <div>
        <button
          style="background-color: rgb(240 0 0)"
          @click="cancelAppointment"
          v-if="
            (activeStatus == 'Mine' || activeStatus == 'MineAccepted') &&
            user.role == 'client'
          "
        >
          Cancel
        </button>
        <button
          style="background-color: rgb(240 200 0)"
          @click="cancelApproving"
        >
          Close
        </button>
        <button
          v-if="activeStatus == 'Predefined' && user.role == 'client'"
          @click="acceptAppointment()"
        >
          Accept
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  getCenter,
  makeAppointment,
  acceptAppointment,
  cancelAppointment,
getAppointment,
} from "../services/requests";
import VueScheduler from "vue-calendar-scheduler";

export default Vue.extend({
  components: { VueScheduler },
  name: "Profile",
  props: {
    id: Number,
  },
  data() {
    return {
      center: {} as any,

      startDateOffset: 0,
      schedulerOptions: {
        weekDays: [1, 5],
      },
      users: [
        {
          id: 1,
          initials: "",
        },
      ],
      openingTimes: {
        open: "0700",
        close: "1500",
      },
      events: [] as any[],
      format: "week",

      showCreateModal: false,
      newResStart: null as any,
      newResEnd: null as any,
      newResDoctor: null as any,

      showAcceptModal: false,
      activeRes: {} as any,
      selectedAppointment: {} as any,
    };
  },
  computed: {
    user(): any {
      return this.$store.state.user;
    },
    startDate(): any {
      return new Date().setDate(new Date().getDate() + this.startDateOffset);
    },
    activeStatus(): any {
      return this.unavailabilityStatus(this.activeRes);
    },
  },
  mounted() {
    this.reloadCenter();
  },
  methods: {
    reloadCenter() {
      getCenter(this.id, this.$store.state.token)
        .catch((err) => {
          console.error(err);
        })
        .then((res) => {
          this.center = res;

          this.events = [];

          this.center.appointments.forEach((termin: any) => {
            this.events.push({
              id: termin.id,
              user_id: 1,
              name: this.unavailabilityStatus(termin),
              start: termin.start,
              end: termin.end,
              unavailability: termin,
              color: this.colorForUnavailability(termin),
            });
          });
        });
    },
    timesSelected: function (selectedPeriod: any) {
      this.showCreateModal = true;

      this.newResStart = selectedPeriod.start;
      this.newResEnd = selectedPeriod.end;

      this.events.push({
        id: 0,
        user_id: 1,
        name: "New Reservation",
        start: selectedPeriod.start,
        end: selectedPeriod.end,
        color: "#808080",
      });
    },
    eventClicked: function (e: any) {
      if (
        this.unavailabilityStatus(e.unavailability) == "Reserved" &&
        e.unavailability["client_id"] != this.user.id
      )
        return;
      this.showAcceptModal = true;
      this.activeRes = e.unavailability;
      getAppointment(this.activeRes.id, this.$store.state.token)
      .then(res => this.selectedAppointment = res )
    },
    cancelNewRes() {
      this.showCreateModal = false;
      this.events.pop();
    },
    saveNewRes() {
      makeAppointment({
        user_id: this.user.id,
        center_id: this.center.id,
        start: this.newResStart,
        end: this.newResEnd,
        token: this.$store.state.token,
        employee_id: this.newResDoctor,
      })
        .then(() => this.reloadCenter())
        .catch((err) => {
          this.reloadCenter();
          if (err.response) {
            alert(err.response.data.message);
          }
        });
      this.showCreateModal = false;
    },
    colorForUnavailability(ua: any): any {
      const colors: any = {
        Unavailable: "#101010",
        Mine: "#32a852",
        MineAccepted: "#32a892",
        Predefined: "#6495ed",
        Reserved: "#f28c28",
        Canceled: "#808080",
        Completed: "#32a852",
        Failed: "#D30000",
      };
      return colors[this.unavailabilityStatus(ua)];
    },
    unavailabilityStatus(appointment: any): any {
      switch (appointment.status) {
        case "reserved":
          if (appointment[this.user.role + "_id"] == this.user.id)
            return "Mine";
          else return "Reserved";
        case "predefined":
          return "Predefined";
        case "accepted":
          if (appointment[this.user.role + "_id"] == this.user.id)
            return "MineAccepted";
          else return "Reserved";
        case "canceled":
          return "Canceled";
        case "completed":
          if (appointment[this.user.role + "_id"] == this.user.id)
            return "Completed";
          else return "Reserved";
        case "failed":
          if (appointment[this.user.role + "_id"] == this.user.id)
            return "Failed";
          else return "Reserved";
      }
    },
    cancelApproving() {
      this.showAcceptModal = false;
    },
    async acceptAppointment() {
      this.showAcceptModal = false;
      acceptAppointment(this.activeRes, {
        token: this.$store.state.token,
      })
        .then((res) => {
          this.reloadCenter();
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data.message);
          }
        });
    },
    async cancelAppointment() {
      this.showAcceptModal = false;
      await cancelAppointment(this.activeRes, {
        token: this.$store.state.token,
      });
      this.reloadCenter();
    },
  },
});
</script>

<style scoped lang="scss">
#center {
  height: calc(100vh - 120px);
  width: 100%;
  padding-top: 120px;
  display: flex;
  position: relative;
  #left {
    width: 30%;
    height: 100%;
    background-color: #fff;
    padding: 20px;
    header {
      h2 {
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
    dl {
      dt {
        font-weight: 500;
        font-size: 1.2rem;
      }
      dd {
        font-size: 1.1rem;
        margin-bottom: 10px;
      }
    }
  }
  #right {
    width: 70%;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .modal {
    position: absolute;
    border: 2px;
    border-style: solid;
    border-color: rgb(78, 122, 179);
    background: rgb(94, 165, 165);
    top: 50vh;
    left: 50vw;
    height: 300px;
    width: 300px;
    transform: translate(-50%, -50%);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 10000;
  }
}
</style>
