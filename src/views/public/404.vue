<template>
  <div class="my-12 py-12 text-center">
    <div class="py-9">
      <v-img src="@/assets/img/404.svg"
        max-height="200"
        max-width="200"
        class="ma-auto">
      </v-img>
    </div>
    <div>
      <h1 style="font-size: 50px;">
        404
      </h1>
      <p class="body-1 mt-2 text-second">
        Page not found. The page you're looking for doesn't exist.
      </p>
      <v-btn
        outlined
        color="primary"
        large
        width="200"
        elevation="0"
        class="white--text text-capitalize"
        to="/">
        Refresh
      </v-btn>
    </div>
  </div>
</template>