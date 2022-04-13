<template>
  <div>
    <v-snackbar 
      top
      text
      rounded="pill"
      :color="color"
      timeout="2000"
      min-width="400"
      v-model="snackbar">
      <v-icon 
        class="ml-1"
        size="22"
        :color="colorIcon">
        {{ Icon }}
      </v-icon>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-icon 
          class="mr-2"
          size="20"
          :color="colorClose"
          v-bind="attrs"
          @click="snackbar = false">
          mdi-close
        </v-icon>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "Snackbar",
  data: () => ({
    snackbar: false,
    color: "success",
    Icon: "mdi-check-circle-outline",
    colorIcon: "#2DC071",
    colorClose: "#A8A8A8",
    text: ""
  }),

  methods: {
    open(color, text, Icon, colorIcon, colorClose) {
      this.snackbar = true;
      this.text = text;
      this.color = color;
      this.Icon = Icon ? Icon : "mdi-check-circle-outline";
      this.colorIcon = colorIcon ? colorIcon : "#2DC071";
      this.colorClose = colorClose ? colorClose : "#A8A8A8";
    }
  }
};
</script>