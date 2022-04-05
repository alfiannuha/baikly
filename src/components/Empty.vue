<template>
  <div class="my-6 text-center text--secondary">
    <!-- <v-img src="@/assets/error/empty.png"
      class="ml-auto mr-auto"
      max-width="300">
    </v-img> -->
    <p class="py-8 title font-weight-bold">{{ contentEmpty }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    components: {
    },
    props: {
     value: String
    },
    computed: {
      contentEmpty: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      },
    },
    watch: {
    },
    mounted () {
    },
    methods: {
    
    }
  }
</script>
