<template>
       <router-view class="view"></router-view>
</template>
<script>
import { apiDev, apiPrd } from "../api.js";
const config = process.env.NODE_ENV === "production" ? apiPrd : apiDev;
export default {
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    
  }
};
</script>
<style scoped>

</style>
