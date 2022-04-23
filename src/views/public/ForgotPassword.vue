<template>
  <div style="min-height: 100vh;">

    <v-row no-gutter justify="center" v-show="!showChangePassword">
      <v-col
        cols="8"
        class="text-center justify-center" style="padding: 0 16% 0 16%">
        <div
          class="d-flex-row align-center justify-center text-center">
          <div class="color-default text-h3 mt-16 mb-8">
            Trouble Logging In?
          </div>

          <ValidationObserver ref="observer">
            <v-form class="text-left mb-5">
              <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                <div class="text-color mb-2">Email</div>
                <v-text-field
                  v-on:keyup.enter="save" 
                  outlined
                  dense
                  autocomplete="off"
                  single-line
                  color="primary"
                  type="email"
                  placeholder="example@gmail.com"
                  v-model="form.email"
                  :error-messages="errors"
                  required>
                </v-text-field>
              </ValidationProvider>
              <!-- <div class="g-recaptcha" data-sitekey="6LdaCpEeAAAAAA8nOoy4-oPSVdegVvFEJazMGlc2"></div> -->
              <div id="recaptcha"></div>
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
              :disabled="$store.state.process.run"
              :loading="$store.state.process.run"
              v-on:keyup.enter="save"
              @click="save"
              class="white--text text-capitalize">
              Send Reset Link
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>

    <div v-if="showChangePassword == true" class="d-flex justify-center align-center pt-16">
      <ChangePassword :email="$route.query.email" :code="$route.query.code"/>
    </div>

  </div>
</template>

<script>
import ChangePassword from '../public/ChangePassword.vue'
import { post } from "@/service/Axios";
export default {
  components: {
    ChangePassword,
  },
  data() {
    return {
      form: {
        emailforgot: '',
        codeforgot: '',
        email: '',
        captcha: '',
      },
      showChangePassword:  true,
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
    
    setTimeout(() =>{
      grecaptcha.render(document.getElementById('recaptcha'), {
        'sitekey' : '6LdaCpEeAAAAAA8nOoy4-oPSVdegVvFEJazMGlc2',
        'callback' : this.verifyCallback,
        'theme' : 'light'
      });
    }, 1000)
  },
  methods: {
    verifyCallback(res) {
      console.log('callback captcha',res);
      this.form.captcha = res;
    },
    async save() {
      this.process.run = true;
      this.error.message = '';

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await post(`auth/forgot-password`, {
          data: {
            email: this.form.email,
            captcha: this.form.captcha,
          }
        }).then(response => {
          let res = response.data
          if (res.code == 201) {
            this.process.run = false;
            this.showChangePassword = true;
          }else {
            this.process.run = false;
            this.error.message = res.errors[0].error;
          }
        }).catch(error => {
          this.process.run = false;
          console.log(error);
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