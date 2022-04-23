<template>
  <div style="min-height: 100vh;">

    <div
      class="d-flex align-center justify-center text-center">
      <v-card width="670px" height="634px" class="mt-16 rounded-xl box-shadow">
        <v-card-text style="padding-right: 130px; padding-left: 130px;">
          <v-img
            :src="require('@/assets/img/checklist.svg')" 
            class="mx-auto mt-8" 
            height="100"
            width="100">
          </v-img>

          <div class="text-h5 text-first mt-5 font-weight-bold">
            Verified
          </div>
          <p style="padding-right: 70px; padding-left: 70px;" class="mt-3 text-second subtitle-2 font-weight-bold">
            Your email has been successfully verified. Enjoy our awesome features!
          </p>
          <div>
            <ValidationObserver ref="observer">
              <v-form class="text-left mb-3">
                <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <div class="text-color mb-2">Email</div>
                  <v-text-field
                    v-on:keyup.enter="verifyEmail" 
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
                <ValidationProvider
                  name="Password"
                  rules="required|min:8"
                  v-slot="{ errors }">
                  <div class="text-color mb-2">Password</div>
                  <v-text-field
                    v-on:keyup.enter="verifyEmail"
                    class="mt-2 mb-1"
                    outlined
                    color="primary"
                    dense
                    autocomplete="off"
                    single-line
                    placeholder="8+ character"
                    v-model="form.password"
                    :type="show ? 'text' : 'password'"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="show = !show"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>
              </v-form>
            </ValidationObserver>
            <div class="text-center justify-center">
              <v-alert type="error" text dense prominent 
                v-show="error.message.length > 0"
                v-html="error.message">
              </v-alert>
              <v-btn class="text-second subtitle-2 mb-7 text-capitalize" to="/forgot/password" text x-small>
                Forgot password?
              </v-btn>
              <v-btn
                block
                x-large
                elevation="0"
                color="primary"
                :disabled="process.run"
                :loading="process.run"
                v-on:keyup.enter="verifyEmail"
                @click="verifyEmail"
                class="white--text text-capitalize">
                Log In
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { post } from "@/service/Axios";
import { TokenService } from "@/service/Storage.Service";

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
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
    let tokens = this.$route.query.token;
    let emails = this.$route.query.email;
    this.verify(tokens, emails);
  },
  methods: {
    async verify(token, email) {
      this.process.run = true;
      await post('auth/verification', {
        data: {
          email,
          token
        }
      })
      .then(response => {
        let res = response.data
        if (res.code == 201) {
          this.process.run = false;
        }else {
          this.$router.push('/404');
        }
      })
      .catch(err => {
        this.process.run = false;
        this.error.message = err.message;
        this.$router.push('/404');
      });
    },
    // login with email and password
    async verifyEmail() {
      this.process.run = true;
      this.error.message = '';

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await post(`auth/login/admin`, {
          data: {
            email: this.form.email,
            password: this.form.password,
          }
        }).then((response) => {
          let res = response.data
          if (res.code == 201) {
            this.process.run = false
            TokenService.saveToken(
              res.data.credential.token,
              JSON.stringify(res.data)
            );
            window.location = '/profile/personal/info'
          }else {
            this.error.message = res.errors[0].error;
            this.process.run = false;
          }
        }).catch(error => {
          this.process.run = false;
          this.error.message = error.message;
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