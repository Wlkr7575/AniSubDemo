<template>
  <v-tooltip bottom>
    <template #activator="{ on, attrs }">
      <v-btn
        icon
        v-bind="attrs"
        v-on="on"
        @click="click"
      >
        <v-icon>{{ `mdi-${icon}` }}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    tooltip: {
      type: String,
      default: ''
    }
  },
  methods: {
    click () { this.$emit('clicked') }
  }
}
</script>

<style>

</style>
