<template>
  <div>
    <div class="title black--text mb-2">{{ title }}</div>
    <v-breadcrumbs class="px-0 pt-0" :items="items">
      <template v-slot:item="{ item }">
        <v-breadcrumbs-item>
          <span v-if="item.disabled">
            {{ item.text }}
          </span>
          <router-link style="color:#F05326" v-else :to="item.href" @click="$store.state.pagination.limit = 10;$store.state.pagination.page = 1">
            {{ item.text }}
          </router-link>
        </v-breadcrumbs-item>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
export default {
  props: {
    items:{
      type: Array,
      default: [],
    },
    title: {
      type: String,
      default: ""
    }
  }
}
</script>