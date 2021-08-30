<template>
  <v-card>
    <v-card-title>Are you sure ?</v-card-title>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  methods: {
    ...mapActions({ delete: 'store/DeletePost' }),
    Remove () {
      this.delete(this.id)
    }
  }
}
</script>

<style>

</style>
