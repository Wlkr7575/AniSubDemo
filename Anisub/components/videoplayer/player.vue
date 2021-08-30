<template>
  <div>hi</div>
</template>

<script>
export default {
  async asyncData ({ $http }) {
    const mountains = await $http.$get('https://api.nuxtjs.dev/mountains')
    return { mountains }
  }
}
</script>

<style>

</style>
