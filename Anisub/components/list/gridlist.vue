<template>
  <v-layout row wrap justify-start justify-space-around>
    <v-flex v-for="item in filteranimes" :key="item._id" class="ma-2">
      <v-card class="mx-auto" :width="`${$vuetify.breakpoint.mdAndUp?'150':`${$vuetify.breakpoint.sm?'130':'100'}`}`" :to="{path: '/detail/', query:{id:item._id}}">
        <v-img :height="`${$vuetify.breakpoint.mdAndUp?'230':`${$vuetify.breakpoint.sm?'200':'160'}`}`" :src="item.imgUrl.front">
          <v-row
            id="row"
            align="end"
            class="fill-height"
          >
            <v-col class="pb-0">
              <div class="title  text-truncate ml-2" style="max-width: 150px;">
                {{ item.name }}
              </div>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['filteranimes']
}
</script>

<style>

</style>
