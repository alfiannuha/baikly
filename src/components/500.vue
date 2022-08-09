<template>
  <v-dialog v-model="$store.state.networkError" persistent max-width="500">
		<v-card class="rounded-xl">
			<v-card-text class="pa-7">
				<v-img 
          src="@/assets/img/500.svg"
					max-height="200"
          max-width="200"
          class="ma-auto">
				</v-img>
				<p class="headline font-weight-bold text-center text-h4">500</p>
				<p class="text-center text-second mb-1 px-10" style="font-size: 14px !important; font-weight: 600">
          Internal server error. Sorry, there were some technical issues while processing your request.
          <span>
            Please check your connection and try again.
          </span> 
        </p>
			</v-card-text>
      <v-card-actions class="pb-5 mx-3 justify-center">
        <v-btn
          outlined
          width="200"
          large
          color="primary"
          class="text-capitalize white--text"
          @click="refresh">
          Refresh
        </v-btn>
      </v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
  methods: {
    refresh() {
      this.$store.state.networkError = false
    }
  }
}
</script>

<style>

</style>