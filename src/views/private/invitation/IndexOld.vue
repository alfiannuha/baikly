<template>
  <div style="min-height: 100vh;">

    <Snackbar ref="snackbar"/>

    <v-dialog v-model="dialog.dialogAddJobs" max-width="500">
      <v-card class="rounded-lg">
        <v-card-title class="justify-center">
          <div class="text-h5 text-first mt-5 font-weight-bold" style="">
            Add New Job Title
          </div>
        </v-card-title>
        <v-card-text style="padding-right: 50px; padding-left: 50px;">
          <ValidationObserver ref="observer">
            <v-form class="text-left">
              <ValidationProvider name="Email" rules="required" v-slot="{ errors }">
                <div class="text-color mb-2">Job Title *</div>
                <v-text-field
                  v-on:keyup.enter="saveJobs" 
                  outlined
                  dense
                  autocomplete="off"
                  single-line
                  color="primary"
                  placeholder="new job title"
                  v-model="form.jobs"
                  :error-messages="errors"
                  required>
                </v-text-field>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions class="px-13 py-4">
          <v-btn
            block
            x-large
            elevation="0"
            color="primary"
            :disabled="process.run"
            :loading="process.run"
            v-on:keyup.enter="saveJobs"
            @click="saveJobs"
            class="white--text text-capitalize">
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <div
      class="d-flex align-center justify-center text-center">
      <v-card width="610px" class="mt-10 rounded-xl box-shadow" scrollable>
        <v-card-title class="justify-center">
          <div class="text-h5 text-first mt-5 font-weight-bold" style="">
            Invite Employee
          </div>
        </v-card-title>
        <v-card-text style="padding-right: 50px; padding-left: 50px;height: 450px;overflow: auto;">
          <div v-for="(item, index) in employees" :key="index" class="mt-3">
            <v-icon color="red" class="float-right" @click="deleteEmployees(index)">
              mdi-trash-can-outline
            </v-icon>
            <ValidationObserver ref="observer">
              <v-form class="text-left">
                <ValidationProvider name="Email" rules="required|email" v-slot="{ errors }">
                  <div class="text-color mb-2">Email *</div>
                  <v-text-field
                    v-on:keyup.enter="loginWithEmail('register')" 
                    outlined
                    dense
                    autocomplete="off"
                    single-line
                    color="primary"
                    type="email"
                    placeholder="example@gmail.com"
                    v-model="item.email"
                    :error-messages="errors"
                    required>
                  </v-text-field>
                </ValidationProvider>
                <ValidationProvider 
                  name="Job Title" 
                  rules="required" 
                  v-slot="{ errors }">
                  <div class="text-color required">Job Title *</div>
                  <v-autocomplete
                    v-model="item.title_job"
                    :items="jobs"
                    item-text="title"
                    item-value="id"
                    color="primary"
                    placeholder="your job title"
                    outlined
                    dense
                    :error-messages="errors"
                    required>
                    <template v-slot:append-item>
                      <v-list class="py-0">
                        <v-list-item @click="dialog.dialogAddJobs = true">
                          <v-list-item-content>
                            <v-list-item-title class="color-default text-lowercase">
                              <v-icon left size="20" color="primary">mdi-plus</v-icon>
                              add new job title
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </template>
                  </v-autocomplete>
                </ValidationProvider>

              </v-form>
            </ValidationObserver>
            <v-divider></v-divider>
          </div>
        </v-card-text>
        <v-card-actions class="flex-column px-13 py-4">
          <v-alert type="error" text dense prominent 
            v-show="error.message.length > 0"
            v-html="error.message">
          </v-alert>
          <v-btn
            block
            outlined
            x-large
            elevation="0"
            color="primary"
            :disabled="process.run"
            :loading="process.run"
            @click="addEmployees"
            class="white--text text-capitalize text-lowercase mb-3">
            <v-icon left size="20">mdi-plus-circle-outline</v-icon>
            more employee
          </v-btn>
          <v-btn
            block
            x-large
            elevation="0"
            color="primary"
            :disabled="process.run"
            :loading="process.run"
            @click="invitationEmployees"
            class="white--text text-capitalize text-capitalize mb-3 mr-2">
            Submit
          </v-btn>
        </v-card-actions>
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
        title_job: ''
      },
      employees: [
        {
          email: '',
          title_job: '',
        }
      ],
      jobs: [
        {
          id: 1,
          title: 'Front End Dev'
        },
        {
          id: 2,
          title: 'Back End Dev'
        },
        {
          id: 3,
          title: 'Mobile Dev'
        },
        {
          id: 4,
          title: 'QA'
        },
        {
          id: 5,
          title: 'Manajer'
        },
      ],
      dialog: {
        dialogAddJobs: false,
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
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    addEmployees() {
      this.employees.push({
        email: '',
        title_job: '',
      })
    },
    deleteEmployees(index) {
      if (this.employees.length > 1) {
        this.employees.splice(index, 1)
      }
    },
    saveJobs() {},
    // login with email and password
    invitationEmployees() {
      this.$refs.snackbar.open("#000000", `You successfully add personal info`);
      // this.$refs.snackbar.open("#000000", `You failed to add personal info. Try again`, "mdi-close-circle-outline", "#E74040");
      this.$store.state.authenticated = true
      this.$router.push('/');
    },
  },

}
</script>

<style>

</style>