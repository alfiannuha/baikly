<template>
  <div style="min-height: 100vh;">

    <Snackbar ref="snackbar"/>

    <div
      class="d-flex align-center justify-center text-center">
      <v-card width="610px" :height="user.user.is_email_google == 1 ? '720px' : '680px'" class="mt-10 rounded-xl box-shadow == 1">
        <v-card-text style="padding-right: 50px; padding-left: 50px;">

          <div class="text-h5 text-first mt-5 font-weight-bold" style="margin-bottom: 20px">
            Personal Info
          </div>
          <div>
            <ValidationObserver ref="observer">
              <v-form class="text-left">
                <div v-show="user.user.is_email_google == 1">
                  <ValidationProvider
                    name="Password"
                    rules="min:8"
                    v-slot="{ errors }">
                    <div class="text-color mb-2">Password</div>
                    <v-text-field
                      v-on:keyup.enter="save"
                      class="mt-1"
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
                </div>

                <ValidationProvider 
                  name="Job Title" 
                  rules="required" 
                  v-slot="{ errors }">
                  <div class="text-color required">Job Title *</div>
                  <v-text-field
                    v-on:keyup.enter="save" 
                    outlined
                    dense
                    class="mt-1"
                    autocomplete="off"
                    single-line
                    color="primary"
                    placeholder="your job title"
                    v-model="form.title_job"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>
                
                <ValidationProvider
                  name="Phone Number"
                  rules="required"
                  v-slot="{ errors }">
                  <div class="text-color">Phone Number *</div>
                  <v-text-field
                    v-on:keyup.enter="save"
                    class="mt-1"
                    outlined
                    color="primary"
                    dense
                    autocomplete="off"
                    type="number"
                    single-line
                    placeholder="eg. 1234567890"
                    v-model="form.phone_number"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>
                
                <ValidationProvider 
                  name="Gender" 
                  rules="required" 
                  v-slot="{ errors }">
                  <div class="text-color">Gender *</div>
                  <v-select
                    :items="genders"
                    v-on:keyup.enter="save"
                    class="mt-1"
                    outlined
                    color="primary"
                    dense
                    autocomplete="off"
                    single-line
                    placeholder="Please Select"
                    v-model="form.gender"
                    :error-messages="errors"
                    required>
                  </v-select>
                </ValidationProvider>

                <ValidationProvider
                  name="Company Name"
                  rules="required"
                  v-slot="{ errors }">
                  <div class="text-color">Company Name *</div>
                  <v-text-field
                    v-on:keyup.enter="save"
                    class="mt-1"
                    outlined
                    color="primary"
                    dense
                    autocomplete="off"
                    single-line
                    placeholder="your company name"
                    v-model="form.company_name"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>
                
                <div class="text-color">Total Employee</div>
                <v-text-field
                  v-on:keyup.enter="save"
                  class="mt-1"
                  outlined
                  color="primary"
                  dense
                  autocomplete="off"
                  single-line
                  placeholder="eg. 1000"
                  v-model="form.total_employees"
                  required>
                </v-text-field>

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
                v-on:keyup.enter="save"
                @click="save"
                class="white--text text-capitalize">
                Submit
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
        email: "",
        title_job: 'Dokter',
        fullname: "",
        password: "",
        phone_number: '0877838838383',
        gender: 'male',
      },
      genders: ["Male", "Women"],
      process: {
        run: false,
      },
      error: {
        message: '',
      },
      show: false,
    }
  },
  computed: {
    user() {
      return JSON.parse(localStorage.getItem('user'));
    }
  },
  methods: {
    // login with email and password
    async save() {
      this.process.run = true;
      this.error.message = '';

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await post(`auth/personal-info`, {
            email: this.form.email,
            job_title : this.form.title_job,
            password : this.form.password,
            mobilephone : this.form.phone_number,
            gender : this.form.gender,
        }).then(response => {
          let res = response.data
          if(res.code == 200) {
            this.$refs.snackbar.open("#000000", `You successfully add personal info`);
            this.$store.state.authenticated = true
            setTimeout(() => {
              this.$router.push('/email/verified');
            },2000)
          }else {
            this.$refs.snackbar.open("#000000", `You failed to add personal info. Try again`, "mdi-close-circle-outline", "#E74040");
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