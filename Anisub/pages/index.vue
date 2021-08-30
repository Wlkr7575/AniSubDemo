<template>
  <div>
    <carousel />

    <v-row justify="center" align="center">
      <v-slide-group
        v-model="model"
        class="pa-4"
        active-class="success"
        show-arrows
      >
        <v-slide-item
          v-for="n in 15"
          :key="n"
        >
          <v-card
            class="ma-4"
            :max-width="`${$vuetify.breakpoint.mdAndUp ?'150':'100'}`"
            :height="`${$vuetify.breakpoint.mdAndUp ?'200':'150'}`"
          >
            <v-img
              class="white--text align-end"
              :height="`${$vuetify.breakpoint.mdAndUp ?'200':'150'}`"
              src="/test.jpeg"
            >
              <v-card-title class="d-inline-block text-truncate" style="max-width: 100px;">
                Top 10 Australian beaches
              </v-card-title>
            </v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-row>
  </div>
</template>

<script>
import carousel from '../components/homepage/homecarousel.vue'
export default {
  components: {
    carousel
  },
  data () {
    return {
      model: 'g'
    }
  }
}
</script>
