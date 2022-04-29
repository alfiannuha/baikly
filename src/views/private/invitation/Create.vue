<template>
  <div class="px-7">
    
    <div class="pa-10 text-h4 font-weight-bold text-color">
      Employee
    </div>

    <v-dialog v-model="dialog.dialogAddJobs" max-width="500">
      <v-card class="rounded-lg">
        <v-card-title class="justify-center">
          <div class="text-h5 text-first mt-5 font-weight-bold" style="">
            Add New Job Title
          </div>
          <v-spacer></v-spacer>
          <v-icon @click="closeJobs()">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text class="px-10">
          <ValidationObserver ref="observerJobs">
            <v-form class="text-left">
              <ValidationProvider name="Job" rules="required" v-slot="{ errors }">
                <div class="text-color mb-2">Job Title *</div>
                <v-text-field
                  v-on:keyup.enter="saveJobs" 
                  outlined
                  dense
                  autocomplete="off"
                  single-line
                  color="primary"
                  placeholder="new job title"
                  v-model="form.title_job"
                  :error-messages="errors"
                  required>
                </v-text-field>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions class="px-10 pb-5">
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

    <v-card elevation="0" class="rounded-lg pa-5 box-shadow">
      <v-card-title>
        <v-row>
          <v-col cols="9">
            Invite Employee
          </v-col>
          <v-col cols="3">
            <v-spacer></v-spacer>
            <v-btn
              block
              outlined
              elevation="0"
              color="primary"
              :disabled="process.run"
              :loading="process.run"
              @click="addEmployees"
              class="white--text text-capitalize mb-3">
              <v-icon left size="20">mdi-plus-circle-outline</v-icon>
              more employee
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-divider class="mx-10 mt-2" style="color: #F9F9F9 !important"></v-divider>
      <v-card-text style="max-height: 550px; overflow: auto">
        <ValidationObserver ref="observer">
          <v-form class="text-left">
            <div v-for="(item, index) in employees" :key="index" class="mt-3">
              <v-icon color="red" class="float-right" @click="deleteEmployees(index)">
                mdi-trash-can-outline
              </v-icon>
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
                  v-model="item.profession"
                  :items="jobs"
                  item-text="profession"
                  item-value="profession"
                  color="primary"
                  placeholder="your job title"
                  outlined
                  dense
                  :error-messages="errors"
                  required>
                  <template v-slot:append-item>
                    <v-list class="py-0">
                      <v-list-item @click="addJobs()">
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

              <v-divider></v-divider>
            </div>
          </v-form>
        </ValidationObserver>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn
          color="primary"
          class="white--text text-capitalize pa-5"
          depressed
          @click="$router.push('/invitation')"
          outlined>
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          :loading="process.run"
          @click="invitationEmployees"
          class="white--text text-capitalize pa-5"
          depressed>
          Submit
        </v-btn>
      </v-card-actions>
    </v-card>
    
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar.vue';
import Dialog from '@/components/Dialog.vue';
import { post, get } from "@/service/Axios";
export default {
  components: {
    Snackbar,
    Dialog
  },
  data() {
    return {
      form: {
        title_job: ''
      },
      employees: [
        {
          email: '',
          profession: '',
        }
      ],
      jobs: [
        // {
        //   id: 1,
        //   title: 'Front End Dev'
        // },
        // {
        //   id: 2,
        //   title: 'Back End Dev'
        // },
        // {
        //   id: 3,
        //   title: 'Mobile Dev'
        // },
        // {
        //   id: 4,
        //   title: 'QA'
        // },
        // {
        //   id: 5,
        //   title: 'Manajer'
        // },
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
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted () {
    this.getJobs()
  },
  methods: {
    addEmployees() {
      this.employees.push({
        email: '',
        profession: '',
      })
    },
    deleteEmployees(index) {
      if (this.employees.length > 1) {
        this.employees.splice(index, 1)
      }
    },
    addJobs() {
      this.dialog.dialogAddJobs = true
      this.$refs.observerJobs.reset()
    },
    closeJobs() {
      this.dialog.dialogAddJobs = false
      this.$refs.observerJobs.reset()
      this.form.title_job = ''
    },
    async getJobs(){
      await get('admin/profession/list?limit=100').then(response => {
        let res = response.data
        console.log(res);
        if (res.code == 200) {
          this.jobs = res.data.data
        }else {
          this.error.message = res.message
          this.dialog.dialogError = true
        }
      }).catch(err => {
        console.log(err);
        this.process.run = false
      })
    },
    async saveJobs() {
      this.process.run = true
      const isValid = await this.$refs.observerJobs.validate();

      if (isValid) {
        await post('admin/profession/create', {
          data: {
            profession: this.form.title_job
          }
        })
          .then(response => {
            let res = response.data
            if (res.code == 201) {
              this.process.run = false
              this.getJobs()
              this.closeJobs()
            }else {
              this.process.run = false
              this.error.message = res.message
            }
          })
          .catch(err => {
            console.log(err);
            this.process.run = false
          })
      }else{
        this.process.run = false
      }
    },
    // login with email and password
    async invitationEmployees() {
      this.process.run = true

      const isValid = await this.$refs.observer.validate();
      if (isValid) {

        let data = {
          data: this.employees
        }
        const response = await post('admin/invite/create', {
          data
        })
        let res = response.data
        console.log(res);
        if (res.code == 200) {
          this.$refs.snackbar.open("#000000", `You successfully add personal info`);
          this.$router.push('/invitation');
          this.process.run = false
        } else {
          this.$refs.snackbar.open("#000000", `You failed to add personal info. Try again`, "mdi-close-circle-outline", "#E74040");
          this.error.message = response.message
          this.process.run = false
        }
      } else {
        this.process.run = false
      }
      
    },
  },

}
</script>

<style>

</style>