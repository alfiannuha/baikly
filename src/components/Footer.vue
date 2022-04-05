<template>
<div :class="token === ''? 'caption font-weight-bold text-center pa-0':''">
  <v-container class="py-0">
    <div :class="token === ''? '':'caption font-weight-bold text-center py-2'">
      2022 &copy; BAIKLY
    </div>
  </v-container>
</div>
</template>
<script>
export default {
  computed: {
    token () {
      return this.$store.state.token
    },
  },
}
</script>