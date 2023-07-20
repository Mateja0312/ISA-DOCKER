<template>
    <div>
      <h1>Example Component</h1>
      <button @click="getData">Fetch Data from Backend</button>
      <button @click="apiTest">Testiraj povezanost sa Glavnom aplikacijom</button>
      <p>{{ responseData }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        responseData: '',
      };
    },
    methods: {
      async getData() {
        try {
          const response = await axios.get('http://localhost:9091/data');
          this.responseData = response.data;
        } catch (error) {
          console.error(error);
        }
      },
      async apiTest() {
        try {
          const response = await axios.get('http://localhost:9091/apitest');
          this.responseData = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
  };
  </script>