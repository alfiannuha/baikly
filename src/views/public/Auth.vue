<template>
  <div style="min-height: 100vh;">
    <!-- REGISTER -->
    <v-expand-x-transition mode="in-out">
      <v-row no-gutters v-show="isShow">
        <v-col cols="4" class="text-center" style="background-color: #f3f3f3">
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
              <v-btn large color="#23A6F0" outlined class="mt-6" @click="isShow = false">
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
              @click="loginWithGoogle()"
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
                    v-on:keyup.enter="loginWithEmail" 
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
                    v-on:keyup.enter="loginWithEmail" 
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
                    v-on:keyup.enter="loginWithEmail"
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
                v-on:keyup.enter="loginWithEmail"
                @click="loginWithEmail"
                class="white--text text-capitalize">
                Sign Up
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-expand-x-transition>

    <!-- LOGIN -->
    <v-expand-x-transition mode="out-in">
      <v-row no-gutters v-show="!isShow">
        <v-col
          cols="8"
          class="text-center justify-center" style="padding: 0 16% 0 16%">
          <div
            class="d-flex-row align-center justify-center text-center">
            <div class="color-default text-h3 mt-16 mb-8">
              Welcome to BAIKLY
            </div>
            <v-btn
              large
              elevation="0"
              outlined
              block
              @click="loginWithGoogle()"
              class="font-weight-medium text-capitalize"
            >
              <img :src="require('@/assets/img/sosmed/login_google.png')"  width="20px" class="mr-4" />
              Continue with Google
            </v-btn>
            <p class="text-third font-weight-normal mb-10 mt-10">
              or use your email account
            </p>

            <ValidationObserver ref="observer">
              <v-form class="text-left mb-5">
                <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <div class="text-color mb-2">Email</div>
                  <v-text-field
                    v-on:keyup.enter="loginWithEmail" 
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
                    v-on:keyup.enter="loginWithEmail"
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
              <p class="text-second subtitle-2">
                Forgot password?
              </p>
              <v-btn
                block
                x-large
                elevation="0"
                color="primary"
                :disabled="$store.state.process.run"
                :loading="$store.state.process.run"
                v-on:keyup.enter="loginWithEmail"
                @click="loginWithEmail"
                class="white--text text-capitalize">
                Log In
              </v-btn>
            </div>
          </div>
        </v-col>
        <v-col cols="4" class="text-center" style="background-color: #f3f3f3">
          <v-img
            :src="require('@/assets/img/login_background.png')" style="height: 100vh;">
            <div class="justify-center text-center px-16 mx-10" style="position: absolute;top: 40%;">
              <div class="font-weight-normal text-h4">
                Hi, friend!
              </div>
              <div class="my-4">
                Enter your personal details
                and start your journey with us 
              </div>
              <div class="g-signin2" data-onsuccess="onSignIn"></div>
              <v-btn large color="#23A6F0" outlined class="mt-6" @click="isShow = true">
                Sign Up
              </v-btn>
            </div>
          </v-img>
          <v-img
            style="position: absolute; top: 25px; left: 25px; width: 80px; height: 35px;"
            :src="require('@/assets/img/baikly_logo.png')">
          </v-img>
        </v-col>
      </v-row>
    </v-expand-x-transition>
  </div>
</template>

<script>
// import firebaseapp from "../../plugins/Firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { post } from "@/service/Axios";

const provider = new GoogleAuthProvider();
export default {
  data() {
    return {
      isShow: true,
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
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    // login with email and password
    async loginWithEmail() {
      this.process.run = true;
      this.error.message = '';
      await post(`auth/register`).then((response) => {
        let res = response.data
        if (res.status == 200) {
          this.$store.commit('setUser', res.data.data);
          this.$store.commit('setToken', res.data.token);
          this.$router.push('/');
        } else {
          this.error.message = res.data.message;
        }
      }).catch(err => {
        this.error.message = err.message;
      })
    },
  },

}
</script>

<style>

</style>