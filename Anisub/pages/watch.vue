<template>
  <div>
    <v-card>
      <v-row>
        <v-col cols="12" sm="8">
          <videoPlayer :url="currentEpisode" :placeholder="store[select].img" />
        </v-col>
        <v-col sm="4">
          <v-list>
            <v-list-item-group v-model="select">
              <v-list-item v-for="(item, i) in store" :key="item._id" @change="$fetch()">
                <v-list-item-title>
                  {{ `${i+1}-р анги` }}
                </v-list-item-title>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import videoPlayer from '../components/videoPlayer.vue'
export default {
  components: { videoPlayer },
  async asyncData ({ $axios, query, data, store }) {
  },
  data () {
    return {
      select: 0
    }
  },
  async fetch () {
    if (this.store[this.select].episode === '') {
      await this.$store.dispatch('episode/getWatch', { id: this.$route.query.id, postid: this.store[this.select]._id })
    }
  },
  computed: {
    ...mapState({ store: state => state.episode.episode }),
    currentEpisode () {
      return this.store[this.select].episode
    },
    currentUrl () {
      return `/api/post/episode/watcah/${this.$route.query.id}&${this.store[this.select]._id}`
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
