<template>
  <div>
    <v-card-text>
      <v-row justify="center" align="center">
        <v-col cols="4" class="d-flex align-center px-0 justify-start">
          
          <!-- ==== LIMIT DATA ==== -->
          <div class="mr-3" style="font-size:16px;">Show</div>
          <div>
            <v-select
              dense
              small
              outlined
              :items="pagination.itemsPerPageOptions"
              v-model="pagination.pagination.itemsPerPage"
              color="#F05326"
              hide-details
              v-on:change="changeLimit()"
              style="width: 100px;">
            </v-select>
          </div>
          <div class="ml-3" style="font-size:16px;">Data</div>
        </v-col>
        <v-col cols="8" class="d-flex align-center px-0 justify-end">
          <!-- ==== STATUS JUMLAH DATA ==== -->
          <div class="subtitle-2 mr-2 mt-1">
            Menampilkan {{ pagination.pagination.pageStart }} - {{ pagination.pagination.pageStop }} dari total {{ pagination.pagination.itemsLength }} Data
          </div>
          <v-btn
            text
            class="ml-4 text-none green--text"
            small
            @click="reload()">
            <v-icon left>mdi-sync</v-icon> Perbarui
          </v-btn>
          <!-- ==== FIRST PAGE ==== -->
          <v-btn
            color="#F05326"
            elevation="0"
            icon
            :disabled="pagination.pagination.page < 2 || isNaN(this.page)"
            class="text-capitalize"
            @click="changePage(1)">
            <v-icon size="25">mdi-page-first</v-icon>
          </v-btn>
          <!-- ==== PREVIOUS PAGE ==== -->
          <v-btn
            color="#F05326"
            elevation="0"
            icon
            :disabled="pagination.pagination.page < 2 || isNaN(this.page)"
            class="text-capitalize"
            @click="changePage(pagination.pagination.page - 1)">
            <v-icon size="25">mdi-chevron-left</v-icon>
          </v-btn>
          <div style="width: 80px;" class="mx-0">
            <v-select
              v-model="pagination.pagination.page"
              dense
              outlined
              class="pa-0 ma-0 mr-2"
              hide-details
              :items="
                Array.from(
                  {
                    length: Math.ceil(pagination.pagination.itemsLength / pagination.pagination.itemsPerPage),
                  },
                  (_, i) => i + 1
                )
              "
              v-on:input="changePage(pagination.pagination.page)"
              style="width: 5rem; text-align: center !important">
            </v-select>
          </div>
          <!-- ==== NEXT PAGE ==== -->
          <v-btn
            color="#F05326"
            elevation="0"
            icon
            :disabled="pagination.pagination.page === pagination.pagination.pageCount || isNaN(this.page)"
            class="text-capitalize"
            @click="changePage(pagination.pagination.page + 1)">
            <v-icon size="25">mdi-chevron-right</v-icon>
          </v-btn>
          <!-- ==== LAST PAGE ==== -->
          <v-btn
            color="#F05326"
            elevation="0"
            icon
            :disabled="pagination.pagination.page === pagination.pagination.pageCount || isNaN(this.page)"
            class="text-capitalize"
            @click="changePage(pagination.pagination.pageCount)">
            <v-icon size="25">mdi-page-last</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script>
  import { get, post, put, destroy } from "../service/Axios";
  export default {
    name: 'pagination-data',
    data: () => ({
      page: 1,
      limit: 10
    }),
    computed: {
      pagination () {
        if (this.$attrs.model.pagination.pageCount === 1) {
          this.page = 1
        }
        return this.$attrs.model
      }
    },
    methods: {
      reload(){
        this.$emit('reload')
      },
      changeLimit() {
        this.page = 1
        this.$store.state.pagination.limit = this.pagination.pagination.itemsPerPage
        // this.limit = this.pagination.pagination.itemsPerPage
        this.$emit('changeLimit', this.$store.state.pagination.limit)
      },
      changePage(numberPage) {
        this.page = parseInt(numberPage)
        this.$store.state.pagination.page =  parseInt(numberPage)
        if (numberPage > this.pagination.pagination.pageCount || this.$store.state.pagination.page < 1) {
          numberPage = 1
          setTimeout(() => {
            this.$store.state.pagination.page = 1
            // this.page = 1
          }, 10);
        }
        // if (!isNaN(this.page)) {
        if (!isNaN(this.$store.state.pagination.page)) {
          this.$emit('changePage', numberPage)
        }
      }
    }
  }
</script>