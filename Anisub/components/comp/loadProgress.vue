<template>
  <div class="text-center">
    <v-progress-circular indeterminate :size="size" :color="color" class="" />
    <p class="text--secondary">
      {{ text }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 0
    },
    text: {
      type: String,
      default: ''
    }
  }

}
</script>

<style>

</style>
