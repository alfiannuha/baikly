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
              <v-btn large color="#23A6F0" outlined class="mt-6" @click="isShow = false;$refs.observerLogin.reset()">
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
              @click="loginWithGoogle('register')"
              class="font-weight-medium text-capitalize"
            >
              <img :src="require('@/assets/img/sosmed/login_google.png')"  width="20px" class="mr-4" />
              Continue with Google
            </v-btn>
            <p class="text-third font-weight-normal mb-10 mt-10">
              or use your email for registration
            </p>

            <ValidationObserver ref="observerRegister">
              <v-form class="text-left mb-5">
                <ValidationProvider name="Full Name" rules="required|max:50" v-slot="{ errors }">
                  <div class="text-color mb-2">Full Name</div>
                  <v-text-field
                    v-on:keyup.enter="loginWithEmail('register')" 
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
                    v-on:keyup.enter="loginWithEmail('register')" 
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
                    v-on:keyup.enter="loginWithEmail('register')"
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
                v-on:keyup.enter="loginWithEmail('register')"
                @click="loginWithEmail('register')"
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
              @click="loginWithGoogle('login')"
              class="font-weight-medium text-capitalize"
            >
              <img :src="require('@/assets/img/sosmed/login_google.png')"  width="20px" class="mr-4" />
              Continue with Google
            </v-btn>
            <p class="text-third font-weight-normal mb-10 mt-10">
              or use your email account
            </p>

            <ValidationObserver ref="observerLogin">
              <v-form class="text-left mb-5">
                <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <div class="text-color mb-2">Email</div>
                  <v-text-field
                    v-on:keyup.enter="loginWithEmail('login')" 
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
                    v-on:keyup.enter="loginWithEmail('login')"
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
                :disabled="$store.state.process.run"
                :loading="$store.state.process.run"
                v-on:keyup.enter="loginWithEmail('login')"
                @click="loginWithEmail('login')"
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
              <v-btn large color="#23A6F0" outlined class="mt-6" @click="isShow = true; $refs.observerRegister.reset()">
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
import firebaseapp from "../../plugins/Firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { post } from "@/service/Axios";
import { TokenService } from "@/service/Storage.Service";

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
  mounted() {
    let slug = this.$route.query.slug;

    if (slug == "is_login") {
      this.isShow = false;
    }
  },
  methods: {
    // login with google
    loginWithGoogle(state) {
      const auth = getAuth();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log('credential',credential);
          console.log('token',token);
          console.log('user_data',user);
          this.loginGoogle(state, user)
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
    // login with google / sso
    async loginGoogle(state, user) {
      this.process.run = true;

      await post(`auth/login-google`, {
        data: {
          account_id: user.uid,
          email: user.email,
          fullname: user.displayName,
        }
      }).then((response) => {
        let res = response.data
        if (res.code == 201) {
          if (state == "login") {
            TokenService.saveToken(
              res.data.token,
              JSON.stringify(res.data.profile)
            );
            this.$router.push('/invitation');
          }else {
            this.$router.push('/confirmation/success/is_registered');
          }
        } else {
          this.error.message = response.message;
        }
      }).catch(err => {
        console.log(err);
        this.error.message = err.message;
      })
    },

    // login with email and password
    async loginWithEmail(state) {
      this.process.run = true;
      this.error.message = '';
      let isValid = null
      if (state == "login") {
        isValid = await this.$refs.observerLogin.validate();
      }else {
        isValid = await this.$refs.observerRegister.validate();
      }
      if(isValid) {
        let data = {}
        let endpoint = ""
        if(state == "register") {
          data = {
            name: this.form.fullname,
            email: this.form.email,
            password: this.form.password,
          }
          endpoint = "auth/register/admin"
        }else {
          data = {
            email: this.form.email,
            password: this.form.password,
          }
          endpoint = "auth/login/admin"
        }
        await post(endpoint, {
          data
        }).then((response) => {
          console.log(response);
          let res = response.data
          console.log(res);
          if (res.code == 201) {
            if (state == "login") {
              this.process.run = false;
              TokenService.saveToken(
                res.data.credential.token,
                JSON.stringify(res.data)
              );
              window.location = '/invitation'
              // this.$router.push('/invitation');
            }else {
              this.$router.push('/confirmation/success/is_registered');
            }
          } else {
            this.process.run = false;
            this.error.message = res.errors[0].error;
          }
        }).catch(err => {
          this.process.run = false;
          this.error.message = err.message;
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