<template>
  <div style="min-height: 100vh;">
    <!-- REGISTER -->
    <v-expand-x-transition mode="in-out">
      <v-row no-gutters>
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
            <div 
              class="g-signin2"  
              id="my-signin2" 
              data-onsuccess="onSuccess" 
              width="100%">
            </div>

            <div class="g_id_signout" @click="signout"></div>
            
            <!-- <v-btn
              large
              elevation="0"
              outlined
              block
              @click="loginWithGoogle('register')"
              class="font-weight-medium text-capitalize"
            >
              <img :src="require('@/assets/img/sosmed/login_google.png')"  width="20px" class="mr-4" />
              Continue with Google
            </v-btn> -->
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
  created() {
    this.signout()
  },
  mounted() {
    this.onLoad()
    this.renderButton()
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
          // console.log('credential',credential);
          // console.log('token',token);
          // console.log('user_data',user);
          this.loginGoogle(user)
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
    renderButton() {
      gapi.signin2.render('my-signin2', {
        'scope': 'profile email',
        'width': 500,
        'height': 50,
        'longtitle': true,
        'theme': 'outline',
        'onsuccess': this.onSuccess,
        // 'onfailure': onFailure
      });
    },
    onLoad() {
      gapi.load('auth2', function() {
        gapi.auth2.init();
      });
    },
    signout() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.disconnect();
      auth2.signOut();
    },
    onSuccess(googleUser) {
      console.log('onSignIn', googleUser);
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);

      googleUser.disconnect()

      const user = {
        uid: profile.getId(),
        displayName: profile.getName(),
        email: profile.getEmail(),
      }

      this.loginGoogle(user)
    },
    // login with google / sso
    async loginGoogle(user) {
      this.process.run = true;

      await post(`v1/auth/login-google`, {
        data: {
          account_id: user.uid,
          email: user.email,
          name: user.displayName,
        }
      }).then((response) => {
        let res = response.data
        TokenService.saveToken(
          res.data.credential.token,
          JSON.stringify(res.data)
        );
        if (res.data.user.is_fill_personal == 0) {
          window.location = '/profile/personal/info'
        }else {
          window.location = '/'
        }
      }).catch(err => {
        this.process.run = false;
        this.error.message = err.message;
      })
    },

    // login with email and password
    async loginWithEmail(state) {
      this.process.run = true;
      this.error.message = '';
      let isValid =  await this.$refs.observerRegister.validate();
      if(isValid) {
        await post(`v1/auth/register/admin`, {
          data: {
            name: this.form.fullname,
            email: this.form.email,
            password: this.form.password,
          }
        }).then((response) => {
          let res = response.data
          if (res.code == 201) {
            this.process.run = false;
            window.location = `/confirmation/success/is_registered?email=${this.form.email}`
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