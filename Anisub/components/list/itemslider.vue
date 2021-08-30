<template>
  <v-row justify="center" align="center">
    <h2 v-if="!episode" class="caption text-secondary">
      No Episode...
    </h2>
    <v-slide-group
      v-else
      v-model="model"
      class="pa-4"
      active-class="success"
      show-arrows
    >
      <v-slide-item
        v-for="(item,i) in episode"
        :key="item._id"
        v-slot="{ toggle }"
      >
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
          <template #activator="{ on, attrs }">
            <v-card
              class="ma-4"
              :max-width="`${$vuetify.breakpoint.mdAndUp ?'250':'200'}`"
              :height="`${$vuetify.breakpoint.mdAndUp ?'150':'100'}`"
              v-bind="attrs"
              v-on="on"
              @click="toggle"
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
          </template>
          <v-card v-if="dialog">
            <v-toolbar>
              <v-btn
                icon
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <v-toolbar-title class="text-center">
                {{ `${model+1}-р анги` }}
              </v-toolbar-title>
              <v-spacer />
              <v-btn
                @click="nextEpisode"
              >
                next
              </v-btn>
            </v-toolbar>
            <v-container>
              <playlist :id="model" :store="episode[model]" />
            </v-container>
          </v-card>
        </v-dialog>
      </v-slide-item>
    </v-slide-group>
  </v-row>
</template>

<script>
import playlist from '../videoplayer/playlist.vue'
export default {
  fetchOnServer: false,
  components: { playlist },
  props: ['episode'],
  data () {
    return {
      model: '',
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  methods: {
    nextEpisode () {
      const length = this.episode.length
      if (this.model === length - 1) { this.model = 0 } else { this.model++ }
    }
  }
}
</script>

<style>

</style>
