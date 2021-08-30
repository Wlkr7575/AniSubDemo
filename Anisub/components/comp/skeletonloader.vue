<template>
  <v-skeleton-loader
    v-bind="attrs"
    :type="skeletontype"
    elevation="0"
  />
</template>

<script>
export default {
  props: {
    skeletontype: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    attrs: {
      class: 'mx-auto',
      boilerplate: false,
      elevation: 0
    }
  })

}
</script>

<style>

</style>
