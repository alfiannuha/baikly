<template>
  <v-dialog v-model="$store.state.dialogAuthAlert" persistent max-width="500">
		<v-card class="rounded-xl">
			<v-card-text>
				<v-img src="@/assets/img/500.svg"
					max-height="200"
          max-width="200"
          class="ma-auto">
				</v-img>
				<p class="headline font-weight-bold text-center text-h4">401</p>
				<p class="font-weight-bold text-center mb-1 px-5" style="font-size: 14px !important;">
          Your request is unauthorized. Please login to continue.

          <!-- {{ $store.state.ContentText == "" ? "Terkendala masalah koneksi. Silahkan periksa koneksi internet Anda" : $store.state.ContentText }} -->
        </p>
        <!-- <div class="font-weight-bold text-center mb-1" style="font-size: 14px !important;">
          {{ $store.state.ContentValidation.question_text }}
        </div> -->
			</v-card-text>
      <v-card-actions class="pb-5 mx-3 justify-center">
        <v-btn
          outlined
          width="200"
          large
          color="primary"
          class="text-capitalize white--text"
          @click="action">
          Refresh
        </v-btn>
      </v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
import { TokenService } from "@/service/Storage.Service";
export default {
  computed:{
    msg(){
      let msgText = ""
      switch (this.$store.state.networkStatus) {
        case "401":
          msgText = "Sesi anda telah habis"
          break;
        case "404":
          msgText = "Permintaan tidak ditemukan"
          break;
        case "400":
          msgText = "Pengisian data ada yang belum lengkap. Silahkan isi ulang data yang belum berhasil di simpan"
          break;
        case "anyStatus":
          msgText = "Terkendala masalah koneksi"
          break;
      }
      return msgText
    }
  },
  methods: {
    action(){
      switch (this.$store.state.networkStatus) {
        case "401":
          this.logout()
          break;
        case "404":
          this.$store.state.dialogAuthAlert = false
          this.$store.state.process.run = false
          break;
        case "400":
          this.$store.state.dialogAuthAlert = false
          this.$store.state.process.run = false
          break;
        case "anyStatus":
          this.$store.state.dialogAuthAlert = false
          this.$store.state.process.run = false
          break;
      }
    },
    logout() {
      TokenService.removeToken()
      this.$store.state.dialogAuthAlert = false
      this.$store.state.process.run = false
      window.location = '/login'
    }
  }
}
</script>

<style>

</style>