<template>
  <div
    class="d-flex align-center justify-center text-center">
    <v-card width="670px" height="634px" class="mt-16 rounded-xl box-shadow">
      <v-card-text style="padding-right: 130px; padding-left: 130px;">
        <v-img
          :src="require('@/assets/img/checklist.svg')" 
          class="mx-auto mt-13" 
          height="122"
          width="122">
        </v-img>

        <div class="text-h4 text-first mt-10">
          {{ title }}
        </div>
        <p style="padding-right: 80px; padding-left: 80px;" class="mt-8 text-second subtitle-2 font-weight-bold">
          {{ description }}
        </p>
        <v-btn class="text-capitalize mt-15" elevation="0" color="primary" block large @click="goTo">
          Continue Log In
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { post } from "@/service/Axios";
export default {
  data() {
    return {
      title: "",
      description: "",
      slug: "",
    }
  },
  mounted () {
    this.slug = this.$route.params.slug
    this.title = this.slug == "is_registered" ? "Registration Successfully" : "Changed successfully"
    this.description = this.slug == "is_registered" ?
     "Thank you! We have sent you email to bayuhernawan@gmail.com. Please click the link in that message to complete your data."
     :
     "Your password has been successfully changed.Use your new password to login!"
  },
  methods: {
    goTo() {
      if (this.slug == 'is_registered') {
        this.$router.push('/email/verified')
      }

      if (this.slug == 'is_changed_password') {
        this.$router.push('/auth?slug=is_login')
      }
    }
  }
}
</script>

<style>

</style>