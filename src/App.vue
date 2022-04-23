<template>
  <v-app>
    <Navbar
      v-if="
        $route.name != 'Auth' ||
        $route.name != 'Confirmation Success' ||
        $route.name != 'Email Verified' ||
        $route.name != 'Forgot Password' ||
        $route.name != 'Personal Info Invitation' ||
        $route.name != 'profile-personal-info'"/>
      <v-main 
        min-height="100vh"
        style="background-color: #fafafa;"
        light>
        <router-view />
      </v-main>
  </v-app>
</template>

<script>
import { TokenService } from "@/service/Storage.Service";
import Footer from "./components/Footer";  
import Navbar from "./components/Navbar"; 
export default {
  name: 'App',
  components: {
    Footer,
    Navbar
  },
  data: () => ({
    menu: [
      {
        title: 'Dashboard',
        to:'/dashboard'
      }
    ]
  }),
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  watch: { 
    '$route' (to, from) {
      if(this.$route.path != '/login'){
        // this.preventPrevilage()
      }
    } 
  },
  methods: {
    preventPrevilage(){
      if(!TokenService.getToken()){
        TokenService.removeToken()
        window.location = '/login'
      }
    }
  }
};
</script>

<style lang="scss">
@for $z from 1 through 24 {
  .v-application .flat-b-#{$z} {
    box-shadow: 0 #{$z * 2}px 0 rgba($color: #000000, $alpha: 0.1) !important;
    border-style: outset;
  }

  .v-application .flat-l-#{$z} {
    box-shadow: #{$z * 2}px 0 0 rgba($color: #000000, $alpha: 0.1) !important;
  }

  .v-application .flat-d-#{$z} {
    box-shadow: #{$z*2}px #{$z*2}px 0 rgba($color: #000000, $alpha: 0.1) !important;
  }

  $z: $z - 1;
}
</style>
