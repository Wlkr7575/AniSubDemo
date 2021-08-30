<template>
  <v-container>
    <v-layout row wrap justify-start justify-space-around>
      <v-flex v-for="(item,i) in episode" :key="item._id" class="ma-2">
        <v-card class="mx-auto" :width="`${$vuetify.breakpoint.mdAndUp ?'250':'200'}`">
          <v-img :height="`${$vuetify.breakpoint.mdAndUp ?'150':'100'}`" :src="item.img">
            <v-row
              id="row"
              align="end"
              class="fill-height"
            >
              <v-col class="pb-0">
                <div class="title  text-truncate ml-2" style="max-width: 150px;">
                  {{ `${i+1 === 1 || i === 5 || i === 9?`${i+1} дүгээр`:`${i+1} дугаар`}` }}
                </div>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['episode']
  // computed: {
  //   epTitle (title) {
  //     if (title === 1 || title === 5 || title === 9) {
  //       return `${title} дүгээр`
  //     } else {
  //       return `${title} дугаар`
  //     }
  //   }
  // }
}
</script>

<style>

</style>
