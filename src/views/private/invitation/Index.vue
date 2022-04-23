<template>
  <div class="px-7">
    
    <div class="py-7 text-h4 font-weight-bold text-color">
      {{ $route.name }}
    </div>

    <Dialog>
      
      <!-- TITLE -->
      <template #title>
        <div v-if="$store.state.dialog.type == 'history'">
          <div class="text-h5 font-weight-bold">
            Change History
          </div>
        </div>

        <div v-if="$store.state.dialog.type == 'edit'">
          <div class="text-h5 font-weight-bold">
            Update Employee
          </div>
        </div>

        <div v-if="$store.state.dialog.type == 'delete'">
          <div class="text-h5 font-weight-bold">
            Confirmation
          </div>
        </div>
      </template>

      <!-- CONTENT -->
      <template #content>
        <div v-if="$store.state.dialog.type == 'history'">

          <!-- FILTER -->
          <v-row no-gutters>
            <v-col cols="2">
              <div class="text-color mt-3" style="font-weight: 600;">Filter</div>
            </v-col>
            <v-col cols="10">
              <v-row>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="3">
                      <div class="text-color mt-3" style="font-weight: 500;">Start</div>
                    </v-col>
                    <v-col cols="8">
                      <v-menu
                        v-model="dateStartState"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="FormatStartFilter"
                            append-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          color="primary"
                          v-model="filter.start"
                          @input="dateStartState = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="6">
                  <v-row>
                    <v-col cols="3">
                      <div class="text-color mt-3" style="font-weight: 500;">End</div>
                    </v-col>
                    <v-col cols="8">
                      <v-menu
                        v-model="dateEndState"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="FormatEndFilter"
                            append-icon="mdi-calendar"
                            readonly
                            outlined
                            dense
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          color="primary"
                          v-model="filter.end"
                          @input="dateEndState = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <!-- DATA FILTER -->
          <v-data-table
            :headers="headersHistory"
            :items="listHistory"
            :search="searching"
            class="elevation-0">
            <template v-slot:[`item.date`]="{ item }">
              {{ item.date | date }}
            </template>
          </v-data-table>

        </div>

        <div v-if="$store.state.dialog.type == 'edit'">
          <v-divider class="mt-3 pa-3"></v-divider>
          <ValidationObserver ref="observerEdit">
            <v-form class="text-left">
              <v-row>
                <v-col cols="4">
                  <div class="text-color mt-3" style="font-weight: 600;">Full Name</div>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    v-on:keyup.enter="save" 
                    outlined
                    filled
                    dense
                    readonly
                    autocomplete="off"
                    single-line
                    color="primary"
                    placeholder="Full Name"
                    v-model="form.name">
                  </v-text-field>
                </v-col>
              </v-row>
                <v-row>
                  <v-col cols="4">
                    <div class="text-color mt-3" style="font-weight: 600;">Email</div>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-on:keyup.enter="save" 
                      outlined
                      filled
                      dense
                      readonly
                      autocomplete="off"
                      single-line
                      color="primary"
                      placeholder="Email"
                      v-model="form.email">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div class="text-color mt-3" style="font-weight: 600;">Job Title</div>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-on:keyup.enter="save" 
                      outlined
                      filled
                      dense
                      readonly
                      autocomplete="off"
                      single-line
                      color="primary"
                      placeholder="Job Title"
                      v-model="form.job_title">
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="4">
                    <div class="text-color mt-3" style="font-weight: 600;">Gender</div>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-on:keyup.enter="save" 
                      outlined
                      filled
                      dense
                      readonly
                      autocomplete="off"
                      single-line
                      color="primary"
                      placeholder="Gender"
                      v-model="form.gender">
                    </v-text-field>
                  </v-col>
                </v-row>
              <ValidationProvider name="Phone Number" rules="required" v-slot="{ errors }">
                <v-row>
                  <v-col cols="4">
                    <div class="text-color mt-3" style="font-weight: 600;">Phone Number *</div>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-on:keyup.enter="save" 
                      outlined
                      dense
                      autocomplete="off"
                      single-line
                      color="primary"
                      placeholder="Phone Number"
                      v-model="form.phone"
                      :error-messages="errors"
                      required>
                    </v-text-field>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider name="Role" rules="required" v-slot="{ errors }">
                <v-row>
                  <v-col cols="4">
                    <div class="text-color mt-3" style="font-weight: 600;">Role *</div>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      v-on:keyup.enter="save"
                      outlined
                      dense
                      color="primary"
                      v-model="form.role"
                      item-text="text"
                      item-value="value"
                      :items="role"
                      :error-messages="errors"
                      required>
                    </v-select>
                  </v-col>
                </v-row>
              </ValidationProvider>
              <ValidationProvider name="fullname" rules="required" v-slot="{ errors }">
                <v-row>
                  <v-col cols="4">
                    <div class="text-color mt-3" style="font-weight: 600;">Status *</div>
                  </v-col>
                  <v-col cols="8">
                    <v-select
                      v-on:keyup.enter="save"
                      outlined
                      dense
                      color="primary"
                      v-model="form.status"
                      item-text="text"
                      item-value="value"
                      :items="status"
                      :error-messages="errors"
                      required>
                    </v-select>
                  </v-col>
                </v-row>
              </ValidationProvider>
            </v-form>
          </ValidationObserver>
        </div>

        <div v-if="$store.state.dialog.type == 'delete'">
          <div class="text-color font-weight-normal">
            Are you sure to delete this employee ?
          </div>
        </div>
      </template>

      <!-- ACTIONS -->
      <template #actions>

        <div v-if="$store.state.dialog.type == 'edit'" class="pa-4">
          <v-btn
            color="primary"
            class="white--text text-capitalize pa-5 mr-4"
            depressed
            @click="closeDialog('edit')"
            outlined>
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            class="white--text text-capitalize pa-5"
            depressed>
            Submit
          </v-btn>
        </div>

        <div v-if="$store.state.dialog.type == 'delete'" class="pa-4">
          <v-btn
            color="primary"
            class="white--text text-capitalize pa-5 mr-4"
            depressed
            @click="closeDialog('delete')"
            outlined>
            Cancel
          </v-btn>
          <v-btn
            color="#E74040"
            class="white--text text-capitalize pa-5"
            depressed
            @click="deleted(form.id)">
            Delete
          </v-btn>
        </div>
      </template>
    </Dialog>

    <v-card class="rounded-lg" elevation="0">
      <v-card-title>
        <v-row>
          <v-col cols="7">
            All Employee
          </v-col>
          <v-col>
            <v-text-field
              outlined
              dense
              flat
              :hide-details="true"
              placeholder="Search . . ."
              v-model="searching"
              clearable
              color="primary"
              autocomplete="off"
              v-on:keyup.enter="fetch()"
              @click:clear="searching = '';fetch()"
              prepend-inner-icon="mdi-magnify">
            </v-text-field>
          </v-col>
          <v-col>
            <v-btn
              color="primary"
              class="mb-2 text-capitalize"
              depressed
              @click="addEmployees()"
              outlined>
              <v-icon left>mdi-plus-circle-outline</v-icon>
              Invite Employee
            </v-btn>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          :headers="headers"
          :items="list"
          :search="searching"
          class="elevation-0">
          <template v-slot:[`item.action`]="{ index, item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs ,on }">
                <v-btn
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  color="primary"
                   @click="editEmployee(item)"
                  icon>
                  <v-img
                    class="mx-auto"
                    :src="require('@/assets/img/tabler_edit.svg')">
                  </v-img>
                  <!-- <v-icon>mdi-pencil-outline</v-icon> -->
                </v-btn>
              </template>
              <span>Edit Employee</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs ,on }">
                <v-btn
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  color="#F05326"
                  class="mr-2"
                  @click="historyEmployee(item)"
                  icon>
                  <v-img
                    :src="require('@/assets/img/tabler_history.svg')">
                  </v-img>
                  <!-- <v-icon>mdi-clock-outline</v-icon> -->
                </v-btn>
              </template>
              <span>Edit History</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs ,on }">
                <v-btn
                  x-small
                  v-bind="attrs"
                  v-on="on"
                  class="mr-2"
                  color="red"
                  @click="confirmation(index)"
                  icon>
                  <v-img
                    :src="require('@/assets/img/tabler_trash.svg')">
                  </v-img>
                  <!-- <v-icon>mdi-trash-can-outline</v-icon> -->
                </v-btn>
              </template>
              <span>Delete Employee</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { get, post } from '@/service/Axios'
import Dialog from '@/components/Dialog'
import moment from 'moment'
export default {
  components: {
    Dialog
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        email: '',
        job_title: '',
        gender: '',
        phone: '',
        role: 'staff',
        status: 'active',
      },
      filter: {
        start: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        end: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      },
      role: [
        {
          text: 'Staff',
          value: 'staff'
        },
        {
          text: 'Admin',
          value: 'admin'
        }
      ],
      status: [
        {
          text: 'Active',
          value: 'active'
        },
        {
          text: 'Inactive',
          value: 'inactive'
        }
      ],
      searching: '', // search
      pagination: {},
      limit: 10,
      page: 1,
      selected: {
        pagination: 0
      },
      dateStartState: false,
      dateEndState: false,
      process: {
        run: false
      },
      list: [
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
        {
          name: 'Alfian Nuha',
          email: 'alfian.nuha@gmail.com',
          job_title: 'Front End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Active'
        },
        {
          name: 'Bayu Hermawan',
          email: 'bayuhermawan@gmail.com',
          job_title: 'Back End Dev',
          gender: 'Male',
          phone: '0812-3456-7890',
          role: 'Admin',
          status: 'Inactive'
        },
      ],
      headers: [
        { text: 'Full Name', value: 'name' },
        { text: 'Job Title', value: 'job_title' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Status', value: 'status' },
        { text: 'Action', value: 'action' }
      ],
      headersHistory: [
        { text: 'Date', value: 'date' },
        { text: 'Activity', value: 'activity' },
      ],
      listHistory: [
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
        {
          date: new Date().toLocaleDateString().toString(),
          activity: 'Invited by Alfian Nuha'
        },
      ],
    }
  },
  computed: {
    FormatStartFilter() {
      return this.filter.start ? moment(this.filter.start).format('DD MMMM YYYY') : '';
    },
    FormatEndFilter() {
      return this.filter.end ? moment(this.filter.end).format('DD MMMM YYYY') : '';
    },
  },
  methods: {
    confirmation(id){
      this.$store.state.dialog.container = true
      // this.$store.state.dialog.title = 'Edit Employee'
      this.$store.state.dialog.type = 'delete'
      this.$store.state.dialog.width = 500
      this.form.id = id
    },
    fetch() {
      console.log(this.searching);
    },
    addEmployees() {
      this.$router.push('/invitation/create')
    },
    editEmployee(item) {
      this.$store.state.dialog.container = true
      this.$store.state.dialog.title = 'Edit Employee'
      this.$store.state.dialog.type = 'edit'
      this.$store.state.dialog.width = 700
      this.form = {
        name: item.name,
        email: item.email,
        job_title: item.job_title,
        gender: item.gender,
        phone: item.phone,
        role: item.role,
        status: item.status,
      }
    },
    closeDialog(state) {
      this.form = {
        id: '',
        name: '',
        email: '',
        job_title: '',
        gender: '',
        phone: '',
        role: 'staff',
        status: 'active',
      }
      if(state == 'edit') {
        this.$refs.observerEdit.reset()
      }
      this.$store.state.dialog.container = false
      this.$store.state.dialog.title = ''
      this.$store.state.dialog.type = ''
    },
    historyEmployee(item) {
      this.$store.state.dialog.container = true
      this.$store.state.dialog.title = 'History Employee'
      this.$store.state.dialog.type = 'history'
      this.$store.state.dialog.width = 800
      this.form = {
        name: item.name,
        email: item.email,
        job_title: item.job_title,
        gender: item.gender,
        phone: item.phone,
        role: item.role,
        status: item.status,
      }
    },


    deleted() {
      this.list.splice(this.form.id, 1)
      this.closeDialog('delete')
    }
  }
}
</script>

<style>

</style>