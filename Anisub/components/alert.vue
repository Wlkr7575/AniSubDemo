<template>
  <v-snackbar v-model="alert">
    {{ `${name} нэртэй анимэ ${type}` }}
  </v-snackbar>
</template>

<script>
export default {
  props: { ok: Boolean, name: { type: String, default: '' }, type: { type: String, default: '' } },
  data () {
    return {
      title: String,
      alert: this.isDone
    }
  }
}
</script>

<style>

</style>
