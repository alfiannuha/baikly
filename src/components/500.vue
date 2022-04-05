<template>
  <v-dialog v-model="$store.state.networkError" persistent max-width="500">
		<v-card class="rounded-xl">
			<v-card-text>
				<v-img 
          src="@/assets/img/500.png"
					class="ml-auto mr-auto"
					max-width="500">
				</v-img>
				<p class="headline font-weight-bold text-center">Oops!</p>
				<p class="font-weight-bold text-center mb-1 px-5" style="font-size: 1.1rem !important;">
          Terkendala dalam mengakses server
        </p>
        <p class="body-2 text-center font-weight-regular">
          Silahkan periksa koneksi internet anda
        </p>
			</v-card-text>
      <v-card-actions class="pb-5 mx-3">
        <v-spacer/>
        <v-btn
          width="150"
          depressed
          color="#F05326"
          class="text-capitalize white--text"
          @click="$store.state.networkError = false">
          OK
        </v-btn>
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