<template>
  <div>
    <Snackbar ref="snackbar"/>

    <div
      class="d-flex align-center justify-center text-center">
      <v-card width="610px" height="400px" class="mt-10 rounded-xl box-shadow">
        <v-card-text style="padding-right: 50px; padding-left: 50px;">

          <div class="text-h5 text-first mt-5 font-weight-bold" style="margin-bottom: 20px">
            Reset Password
          </div>
          <div>
            <ValidationObserver ref="observer">
              <v-form class="text-left">
                <ValidationProvider
                  name="New Password"
                  vid="confirm"
                  rules="required|min:8"
                  v-slot="{ errors }">
                  <div class="text-color">New Password *</div>
                  <v-text-field
                    v-on:keyup.enter="savePassword"
                    class="mt-2 mb-1"
                    autocomplete="new-password"
                    outlined
                    dense
                    color="primary"
                    placeholder="8+ characters"
                    v-model="form.newpassword"
                    :type="show_newpassword ? 'text' : 'password'"
                    :append-icon="show_newpassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show_newpassword = !show_newpassword"
                    :error-messages="errors"
                    required
                  >
                  </v-text-field>
                </ValidationProvider>

                    

                <ValidationProvider
                  name="Confirm New Password"
                  rules="required|min:8|confirmed:confirm"
                  v-slot="{ errors }">
                  <div class="text-color">Re-type New Password *</div>
                  <v-text-field
                    v-on:keyup.enter="savePassword"
                    class="mt-2 mb-1"
                    autocomplete="new-password"
                    outlined
                    dense
                    color="primary"
                    placeholder="8+ characters"
                    v-model="form.confirmnewpassword"
                    :type="show_confirmnewpassword ? 'text' : 'password'"
                    :append-icon="show_confirmnewpassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show_confirmnewpassword = !show_confirmnewpassword"
                    :error-messages="errors"
                    required
                  >
                  </v-text-field>
                </ValidationProvider>
                
              </v-form>
            </ValidationObserver>
            <div class="text-center justify-center">
              <v-alert type="error" text dense prominent 
                v-show="error.message.length > 0"
                v-html="error.message">
              </v-alert>
              <v-btn
                block
                x-large
                elevation="0"
                color="primary"
                :disabled="process.run"
                :loading="process.run"
                v-on:keyup.enter="savePassword"
                @click="savePassword"
                class="white--text text-capitalize">
                Reset
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';
import { post } from "@/service/Axios";
export default {
  components: {
    Snackbar
  },
  data() {
    return {
      form: {
        codes: '',
        emails: '',
        newpassword: '',
        confirmnewpassword: '',
      },
      show_newpassword: false,
      show_confirmnewpassword: false,
      process: {
        run: false,
      },
      error: {
        message: '',
      },
      show: false,
    }
  },
  mounted () {
    this.form.codes = this.$route.query.code;
    this.form.emails = this.$route.query.email;
  },
  methods: {
    async savePassword() {
      this.process.run = true;
      this.error.message = '';

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await post(`v1/auth/reset-password`, {
          data: {
            email: this.form.emails,
            code: this.form.codes,
            password: this.form.newpassword,
            re_password: this.form.confirmnewpassword,
          }
        }).then(response => {
          let res = response.data;
          if (res.code == 201) {
             this.process.run = false;
            this.$refs.snackbar.open("#000000", `You successfully reset password`);
            window.location = '/confirmation/success/is_changed_password'
          }else {
            this.process.run = false;
            this.error.message = res.errors[0].error;
          }
        }).catch(error => {
           this.process.run = false;
        })
      }else {
        this.process.run = false;
      }
    },
  },

}
</script>

<style>

</style>