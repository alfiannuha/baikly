<template>
  <div class="my-12 py-12 text-center">
    <div class="py-9">
      <v-img src="@/assets/img/404.png"
        max-height="500"
        max-width="500"
        class="ma-auto">
      </v-img>
    </div>
    <div>
      <p class="title text-first font-weight-bold mb-1">
        Halaman Tidak Ditemunkan Atau Pengaksesan Tidak Diberikan
      </p>
      <span class="body-2 mt-2 text-second">
        Sepertinya halaman yang Anda tuju tidak terdaftar dalam menu kami atau
      </span>
      <p class="body-2 mt-2 text-second">
        Anda tidak diberikan akses ke halaman yang di tuju .
      </p>
      <v-btn
        small
        light
        width="200"
        color="#263238"
        elevation="3"
        class="white--text text-capitalize caption"
        to="/dashboard">
        <v-icon small class="mr-1">mdi-chevron-left-circle-outline</v-icon>
        Kembali Ke Halaman Awal
      </v-btn>
    </div>
  </div>
</template>