<template>
  <v-dialog v-model="$store.state.dialog.container" scrollable persistent transition="dialog-bottom-transition" :width="$store.state.dialog.width">
    <v-card class="rounded-lg" elevation="0">
      <v-card-title>
        <slot name="title"/>
        <v-spacer></v-spacer>
        <v-icon @click="$store.state.dialog.container = false">
          mdi-close
        </v-icon>
      </v-card-title>
      <v-card-text style="max-height: 650px;">
        <slot name="content"/>
      </v-card-text>
      <v-card-actions>
        <slot name="actions"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
}
</script>

<style>

</style>