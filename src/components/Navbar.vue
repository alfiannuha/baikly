<template>
  <div v-if="token">
    <Unauthorized/>
    <ErrorNetwork/>

    <!-- ==== DIALOG KONFIRMASI UPGRADE VERSI TERBARU ==== -->
    <v-dialog v-model="dialog.upgrade" persistent max-width="500">
      <v-card class="border-radius box-shadow">
        <v-card-title>
          <v-spacer></v-spacer>
          <v-btn
            large
            icon
            color="#F05326"
            class="text-capitalize"
            @click="dialog.upgrade = false">
            <v-icon color="#F05326">mdi-close-circle</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-img :src="require('@/assets/img/update_apps.png')"
            class="mx-auto"
            width="400">
          </v-img>
          <p class="mt-5 text-h6 font-weight-bold text-center">Versi baru telah tersedia.</p>
          <p class="mt-2 text-center">Silahkan klik tombol Refresh untuk mendapatkan versi terbaru.</p>
        </v-card-text>
        <v-card-actions class="pb-7 mx-3">
          <v-spacer></v-spacer>
          <v-btn
            small
            depressed
            color="#F05326"
            class="text-capitalize white--text"
            @click="refreshApp()">
            <v-icon color="white" small class="mr-1">mdi-refresh</v-icon>
            Refresh
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ==== DIALOG KONFIRMASI LOGOUT ==== -->
    <v-dialog v-model="dialog.logout" persistent max-width="450">
      <v-card class="border-radius box-shadow">
        <v-card-text style="height: 400px">
          <!-- <v-img :src="require('@/assets/img/confirmation/logout.png')"
            class="ml-auto mr-auto"
            max-width="500">
          </v-img> -->
          <p class="headline font-weight-bold text-center">Yaaahh &#128553;
            <!-- <v-icon class="ml-2">mdi-emoticon-frown-outline</v-icon> -->
          </p>
          <p class="mt-5 body-2 font-weight-regular text-center">Yakin kamu ingin keluar ?</p>
        </v-card-text>
        <v-card-actions class="pb-5 mx-3">
          <v-spacer></v-spacer>
          <v-btn
            small
            depressed
            width="100"
            color="#F05326"
            :loading="$store.state.process.run"
            :disabled="$store.state.process.run"
            class="white--text text-capitalize"
            @click="logout">
            <v-icon color="#fff" small class="mr-1">mdi-check-circle</v-icon>
            Ya
          </v-btn>
          <v-btn
            small
            outlined
            width="100"
            color="red"
            :disabled="$store.state.process.run"
            class="text-capitalize"
            @click="dialog.logout = false">
            <v-icon color="red" small class="mr-1">mdi-close-circle</v-icon>
            Tidak
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- ==== NAVBAR ATAS ==== -->
    <v-app-bar
      fixed
      app
      style="border-bottom: 1px solid rgba(0, 0, 0, 0.12)!important;"
      :color="$vuetify.theme.dark ? 'dark' : 'white'"
      elevation="0">

      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm' || $vuetify.breakpoint.name === 'md'"
        @click.stop="drawer = !drawer"/>
      <v-toolbar-title :class="$vuetify.breakpoint.name === 'xs' ? '' : 'ml-3'">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-left">
        <v-sheet height="50" width="300">
          <v-list-item
            dense
            to="/settings"
            class="py-0 pt-1 pb-1 pl-1 my-0"
            style="background-color: #F05326; border-color: #F05326; border-radius: 50px;font-size:19px">
              <v-list-item-avatar v-if="user.picture" class="my-0" style="height: 42px; min-width: 42px; width: 42px; border: 3px solid rgb(255, 255, 255);background-color: white">
                <v-img :src="user.picture">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center">
                      <v-progress-circular
                        indeterminate
                        color="#F05326">
                      </v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-list-item-avatar>
              <v-list-item-avatar v-else class="my-0" style="height: 42px; min-width: 42px; width: 42px; border: 3px solid rgb(255, 255, 255);background-color: white">
                <v-img :src="require('@/assets/img/profile_picture.png')">
                  <template v-slot:placeholder>
                    <v-row
                      class="fill-height ma-0"
                      align="center"
                      justify="center">
                      <v-progress-circular
                        indeterminate
                        color="#F05326">
                      </v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-list-item-avatar>
              <v-list-item-content class="py-0 mt-0">
                <v-list-item-title class="white--text pt-0">
                  {{ user.name }}
                </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
        </v-sheet>
      </div>
      <div class="pr-6 cursor-pointer hidden-md-and-down"
        @click="logout">
        <v-card-title class="justify-center pt-1 pb-0">
          <v-icon color="red">mdi-logout-variant</v-icon>
        </v-card-title>
        <v-card-text class="caption text-center pa-0 red--text color-second">
          Keluar
        </v-card-text>
      </div>
    </v-app-bar>

    <!-- ==== NAVIGATION DRAWER BAGIAN SAMPING KIRI ==== -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      app
      v-if="$route.name !== '/auth'">
      <v-list-item class="px-2" style="margin-bottom:7px">
        <v-list-item-avatar>
          <!-- <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img> -->
          <v-avatar color="#F05326">
            <span class="white--text text-h6 pr-2">{{ aliasName }}</span>
          </v-avatar>
        </v-list-item-avatar>
        <v-list-item-title>CMS KIMI</v-list-item-title>
        <v-btn
          icon
          @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
        dense
        nav
        v-for="item in menu"
        :key="item.title"
        style="color:#F05326"
        class="py-1">
        <v-list-item
          link
          @click="$store.state.pagination.limit = 10;$store.state.pagination.page = 1"
          v-if="item.hasParent === 0"
          :to="item.href"
          :value="item.href.split('/')[1] === comparePath.split('/')[1] ? true : false">
          <v-list-item-icon class="mr-3">
            <v-tooltip right>
              <template v-slot:activator="{on, attrs}">
                <v-icon size="25" v-on="on" v-bind="attrs">{{ item.icon }}</v-icon>
              </template>
              <span style="color:#fff">{{ item.text }}</span>
            </v-tooltip>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-group
          no-action
          class="ma-3"
          v-if="item.hasParent === 1"
          :value="item.href.split('/')[0] === comparePath.split('/')[0] ? true : false">
          <template v-slot:activator>
            <v-list-item-icon class="mr-3">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </template>
          <v-list-item
            v-for="(g, index) in item.submenu"
            :key="index"
            :to="g.href"
            link
            class="pl-7">
            <v-list-item-icon class="mr-3">
              <v-icon>{{ g.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
              {{ g.text }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
  import { get, post, put, destroy } from "@/service/Axios";
  import { TokenService } from "@/service/Storage.Service";
  import Unauthorized from "../components/401.vue";
  import ErrorNetwork from "../components/500.vue";
  import store from '@/store'
  export default {
    components: {
      Unauthorized,
      ErrorNetwork,
    },
    data (vm) {
      return {
        breadcrumbs: [],
        pageTitle: "",
        loaded: true,
        comparePath: "",
        image_profile: "",
        refreshing: false,
        updateExists: false,
        model: null,
        drawer: true,
        darkMode: false,
        mini: false,
        initialDark: vm.$vuetify
        ? vm.$vuetify.theme.dark
        : false,
        menu: [
          {
            text: 'Dashboard',
            icon: 'mdi-speedometer-slow',
            href: '/dashboard',
            hasParent: 0,
          },
          {
            text: 'Topic & Activity',
            icon: 'mdi-briefcase-variant-outline',
            href: '/course',
            hasParent: 0,
          },
          {
            text: 'Users',
            icon: 'mdi-account-check-outline',
            href: '/users',
            hasParent: 0,
          },
          {
            text: 'Settings',
            icon: 'mdi-cog-outline',
            href: '/settings',
            hasParent: 0,
          },
        ],
        dialog: {
          logout: false,
          upgrade: false,
        },
        process: {
          run: false
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
    watch: {
      '$route' (to, from) { 
        if (from.matched.length > 0) {
          this.comparePath = this.$route.path
          if(to.path == from.matched[0].path){
            this.$router.push(from.path)
          }
        }
      },
    },
    computed: {
      aliasName() {
        let firstAlias = "";
        let secondAlias = "";
          let name = "CMS KIMI"
          let splitname = name.split(" ");

          if (splitname[0]) {
            firstAlias = splitname[0].substring(0, 1);
          }

          if (splitname[1]) {
            secondAlias = splitname[1].substring(0, 1);
          }
        return firstAlias + secondAlias;
      },
      errorNetwork() {
        return this.$store.state.dialogAuthAlert;
      },
      user () {
        return JSON.parse(TokenService.getUser())
      },
      token () {
        return this.$store.state.token
      }
    },
    mounted () {},
    methods: {
      showRefreshUI (e) {
        this.registration = e.detail;
        this.updateExists = true;
        this.dialog.upgrade = true;
      },
      refreshApp () {
        this.updateExists = false;
        this.dialog.upgrade = false;
        if (!this.registration || !this.registration.waiting) { return; }
        this.registration.waiting.postMessage('skipWaiting');
      },
      convert(item) {
        return item.replace(/&lt;/g, '<')
      },
      isMobile() {
        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          return true
        } else {
          return false
        }
      },
      loading(){
        window.location.reload()
      },
      logout() {
        this.$store.state.process.run = true
        TokenService.removeToken()
        localStorage.clear();
        window.location = '/auth'
      }
    },
  }
</script>

<style>
  .c-default {
    color: #F0932B !important;
  }
  .divider-menu {
    min-height: 50px !important;
    height: 50px;
    width: 26px;
    min-width: 5px;
    margin-top: auto;
    margin-bottom: auto;
    background: #fff;
    border-radius: 10px 0px 0px 10px;
    position: relative;
    right: -2px;
  }
  .headerthing {
    background-color: #F05326;
    height: 8vh;
  }
  .c-p {
    cursor: pointer;
  }

  .bar-app {
    background: linear-gradient(to bottom, #F0932B 0%, #BF6500 100%);
  }
  .ml-80 {
    margin-left: 20%;
  }
  .hover-menu:hover, .actived {
  background: #F053261c !important;
  }
</style>