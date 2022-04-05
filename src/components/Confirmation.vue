<template>
  <v-dialog v-model="$store.state.dialog.confirmDelete" width="450">
    <v-card>
      <v-card-title>
        Peringatan !
        <v-spacer></v-spacer>
        <v-icon size="30" @click="$store.state.dialog.confirmDelete = false" color="red">mdi-close-circle-outline</v-icon>
      </v-card-title>
      <v-card-text class="subtitle-1 font-weight-bold">
        Apakah Anda ingin menghapus data ini ?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="#F05326"
          elevation="0"
          class="white--text"
          @click="$emit('action-delete','process')">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>