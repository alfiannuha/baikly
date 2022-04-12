<template>
  <div style="min-height: 100vh;">
    <v-row no-gutters>
      <v-col cols="4" class="text-center">
        <v-img
          :src="require('@/assets/img/login_background.png')" style="height: 100vh;">
          <div class="justify-center text-center px-16 mx-10" style="position: absolute;top: 40%;">
            <div class="font-weight-normal text-h4">
              Welcome back!
            </div>
            <div class="my-4">
              To keep connected with us please
              login with your personal info
            </div>
            <v-btn large color="#23A6F0" outlined class="mt-6" @click="$router.push('/login')">
              Log in
            </v-btn>
          </div>
        </v-img>
        <v-img
          style="position: absolute; top: 25px; left: 25px; width: 80px; height: 35px;"
          :src="require('@/assets/img/baikly_logo.png')">
        </v-img>
      </v-col>
      <v-col
        cols="8"
        class="text-center justify-center" style="padding: 0 16% 0 16%">
        <div
          class="d-flex-row align-center justify-center text-center">
          <div class="color-default text-h3 mt-16 mb-8">
            Create Account
          </div>
          <v-btn
            large
            elevation="0"
            outlined
            block
            class="font-weight-medium text-capitalize"
          >
            <img :src="require('@/assets/img/sosmed/login_google.png')"  width="20px" class="mr-4" />
            Continue with Google
          </v-btn>
          <p class="text-third font-weight-normal mb-10 mt-10">
            or use your email for registration
          </p>

          <ValidationObserver ref="observer">
            <v-form class="text-left mb-5">
              <ValidationProvider name="Full Name" rules="required|email" v-slot="{ errors }">
                <div class="text-color mb-2">Full Name</div>
                <v-text-field
                  v-on:keyup.enter="save" 
                  outlined
                  dense
                  autocomplete="off"
                  single-line
                  color="primary"
                  placeholder="your name"
                  v-model="form.fullname"
                  :error-messages="errors"
                  required>
                </v-text-field>
              </ValidationProvider>
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
              <ValidationProvider
                name="Password"
                rules="required"
                v-slot="{ errors }">
                <div class="text-color mb-2">Password</div>
                <v-text-field
                  v-on:keyup.enter="save"
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
              Sign Up
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        fullname: '',
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
  methods: {
    // login with google
    loginWithGoogle() {
      this.$auth.loginWith('google')
    },
    // login with facebook
    loginWithFacebook() {
      this.$auth.loginWith('facebook')
    },
    // login with twitter
    loginWithTwitter() {
      this.$auth.loginWith('twitter')
    },
    // login with github
    loginWithGithub() {
      this.$auth.loginWith('github')
    },
    // login with email and password
    loginWithEmail() {
      this.$auth.loginWith('local', {
        data: {
          username: this.form.username,
          password: this.form.password
        }
      })
    },
  },

}
</script>

<style>

</style>