<template>
  <div>
    <v-snackbar 
      top
      text
      :color="color"
      timeout="2000"
      v-model="snackbar">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-icon 
          :color="color"
          v-bind="attrs"
          @click="snackbar = false">
          mdi-close-circle
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
    text: ""
  }),

  methods: {
    open(color, text) {
      this.snackbar = true;
      this.text = text;
      this.color = color;
    }
  }
};
</script>