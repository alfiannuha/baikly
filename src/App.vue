<template>
  <v-app>
    <v-snackbar
      v-model="snackbar.state"
      bottom
      right
      vertical
      color="success"
      timeout="-1"
    >
      <div class="subtitle-1 font-weight-normal">
        {{ snackbar.text }}
      </div>
      <template v-slot:action="{ attrs }">
        <v-btn
          text
          color="#fff"
          class="text-capitalize font-weight-bold"
          v-bind="attrs"
          @click.stop="refreshApp"
        >
          Refresh App
        </v-btn>
      </template>
    </v-snackbar>

    <Navbar
      v-if="
        $route.name != 'Auth' &&
        $route.name != 'Confirmation Success' &&
        $route.name != 'Email Verified' &&
        $route.name != 'Forgot Password' &&
        $route.name != 'Personal Info Invitation' &&
        $route.name != 'Personal Info'"/>
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
    snackbar: {
      state: false,
      text: "Versi terbaru telah tersedia"
    },
    refreshing: false,
    updateExists: false,
  }),
  watch: { 
    '$route' (to, from) {
      if(this.$route.path != '/login'){
        // this.preventPrevilage()
      }
    } 
  },
  created () {
    document.addEventListener(
      'swUpdated', this.showRefreshUI, { once: true }
    );
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener(
        'controllerchange', () => {
          if (this.refreshing) return;
          this.refreshing = true;
          window.location.reload();
        }
      );
    }
  },
  computed: {
    token () {
      return this.$store.state.token
    }
  },
  methods: {
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackbar.text = 'Versi terbaru telah tersedia!';
      this.snackbar.state = true;
    },
    refreshApp() {
      this.snackbar.state = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
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
