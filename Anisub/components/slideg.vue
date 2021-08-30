<template>
  <v-row justify="center" align="center">
    <v-slide-group
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(item,i) in episode"
        :key="item._id"
      >
        <v-card
          class="ma-4"
          :max-width="`${$vuetify.breakpoint.mdAndUp ?'250':'200'}`"
          :height="`${$vuetify.breakpoint.mdAndUp ?'150':'100'}`"
          :to="{path: '/watch/', query:{id:$route.query.id,postid:item._id}}"
        >
          <v-img
            class="white--text align-end"
            :height="`${$vuetify.breakpoint.mdAndUp ?'150':'100'}`"
            :src="item.img"
          >
            <v-card-title class="d-inline-block text-truncate pb-0" :style="`${$vuetify.breakpoint.mdAndUp ?'max-width: 240px;':'max-width: 180px;'}`">
              {{ `${i+1}-р анги` }}
            </v-card-title>
          </v-img>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </v-row>
</template>

<script>
export default {
  props: ['episode'],
  data () {
    return {
      model: ''
    }
  }
}
</script>

<style>

</style>
