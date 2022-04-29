<template>
  <div style="min-height: 100vh;">

    <Snackbar ref="snackbar"/>

    <div
      class="d-flex align-center justify-center text-center">
      <v-card width="610px" height="680px" class="mt-10 rounded-xl box-shadow == 1">
        <v-card-title class="text-center justify-center">
          <div class="text-h5 text-first font-weight-bold">
            Personal Info
          </div>
        </v-card-title>
        <v-card-text class="px-12" style="height:540px; overflow: auto">

          <!-- <div class="text-h5 text-first mt-5 font-weight-bold" style="margin-bottom: 20px">
            Personal Info
          </div> -->
          <div>
            <ValidationObserver ref="observer">
              <v-form class="text-left">
                <ValidationProvider
                  name="Password"
                  rules="min:8"
                  v-slot="{ errors }">
                  <div class="text-color mb-2">Email</div>
                  <v-text-field
                    v-on:keyup.enter="save"
                    class="mt-1"
                    outlined
                    color="primary"
                    dense
                    readonly
                    filled
                    autocomplete="off"
                    single-line
                    v-model="form.email"
                    type="text"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>

                <ValidationProvider 
                  name="Job Title" 
                  rules="required" 
                  v-slot="{ errors }">
                  <div class="text-color required">Job Title *</div>
                  <v-text-field
                    v-on:keyup.enter="save" 
                    outlined
                    dense
                    readonly
                    filled
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
                  name="Job Title" 
                  rules="required" 
                  v-slot="{ errors }">
                  <div class="text-color required">Full Name*</div>
                  <v-text-field
                    v-on:keyup.enter="save" 
                    outlined
                    dense
                    class="mt-1"
                    autocomplete="off"
                    single-line
                    color="primary"
                    placeholder="your full name"
                    v-model="form.name"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>

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
                    dense
                    readonly
                    filled
                    color="primary"
                    autocomplete="off"
                    single-line
                    placeholder="your company name"
                    v-model="form.company_name"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>
                
                <!-- <div class="text-color">Total Employee</div>
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
                </v-text-field> -->

              </v-form>
            </ValidationObserver>
          </div>
        </v-card-text>
        <v-card-actions class="text-center justify-center px-12">
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
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';
import { post, get } from "@/service/Axios";
export default {
  components: {
    Snackbar
  },
  data() {
    return {
      form: {
        id: "",
        email: "",
        name: "",
        password: "",
        title_job: '',
        company_name: "",
        phone_number: '',
        gender: '',
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
  mounted () {
    this.id = this.$route.query.id;
    this.acceptInvitation(this.$route.query.id)
  },
  methods: {
    acceptInvitation(id){
      post(`employee/invite/accept`, {
        data: {
          id
        }
      }).then(response => {
        let res = response.data
        if (res.code == 201) {
          this.getDetail(id)
        }else{
          this.error.message = res.message
        }
      })
    },
    getDetail(id) {
      get(`employee/invite/detail/${id}`).then(response => {
        let res = response.data
        if (res.code == 200) {
          this.form.name = res.data.name
          this.form.email = res.data.email
          this.form.company_name = res.data.company_name
          this.form.title_job = res.data.profession_name
        }else {
          this.error.message = res.message
        }
      }) 
    },
    // login with email and password
    async save() {
      this.process.run = true;
      this.error.message = '';

      const isValid = await this.$refs.observer.validate();

      if (isValid) {
        await post(`employee/invite/personal-info`, {
          data: {
            id: this.form.id,
            password: this.form.password,
            name: this.form.name,
            mobilephone: this.form.phone_number,
            gender: this.form.gender,
          }
        }).then(response => {
          let res = response.data
          if(res.code == 200) {
            this.$refs.snackbar.open("#000000", `You successfully add personal info`);
            this.$store.state.authenticated = true
            setTimeout(() => {
              this.$router.push('/login');
            },2000)
          }else {
            this.process.run = false;
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