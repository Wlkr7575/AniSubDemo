<template>
  <div>
    <v-row>
      <v-col cols="12" sm="8" class="pb-0 pr-0">
        <v-container v-if="load">
          <progres :size="36" :color="`${$vuetify.theme.dark?'error':'primary'}`" />
        </v-container>
        <videoPlayer v-else :url="video" />
      </v-col>
      <v-col sm="4" class="pa-0">
        <v-layout fill-height column class="pa-2">
          <v-flex sm10>
            <v-list>
              <v-list-item v-for="item in comments" :key="item._id">
                <v-list-item-avatar size="30">
                  <v-img src="/placeholder.jpg" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title> {{ item.user }}</v-list-item-title>
                  <v-list-item-subtitle>{{ item.comment }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-btn @click="loadcomm">
                load
              </v-btn>
            </v-list>
          </v-flex>
          <v-flex sm2>
            <v-text-field
              v-model="comment"
              outlined
              hide-details
              dense
              label="Comment"
              @keydown.enter="addcomment"
            />
          </v-flex>
        </v-layout>
        <!-- <v-card height="200">
          <v-list>
            <v-list-item>
              <v-list-item-avatar src="/placeholder.jpg" />
              <v-list-item-title> hi</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
        <v-text-field outlined label="Comment"/> -->
        <!-- <v-card height="100%">
          <v-list height="75%">
            <v-list-item>
              <v-list-item-avatar src="/placeholder.jpg" />
              <v-list-item-title> hi</v-list-item-title>
            </v-list-item>
          </v-list>
          <v-text-field outlined hide-details label="Comment" />
        </v-card> -->
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import videoPlayer from '../videoplayer/videoPlayer.vue'
import progres from '../comp/loadProgress.vue'
export default {
  components: { videoPlayer, progres },
  props: ['store', 'id'],
  data () {
    return {
      select: 0,
      load: false,
      video: '',
      comment: ''
    }
  },
  computed: {
    ...mapState({ comments: state => state.episode.comment }),
    currentEpisode () {
      return this.store[this.select]
    }
  },
  mounted () {
    this.loadEpisode()
  },
  methods: {
    ...mapActions({ loadComment: 'episode/fetchComment' }),
    loadEpisode () {
      if (this.store.episode === '') {
        this.load = true
        this.$store.dispatch('episode/getWatch', { id: this.$route.query.id, postid: this.store._id }).then(() => {
          this.video = this.store.episode
          this.load = false
        })
      } else {
        this.video = this.store.episode
      }
    },
    async addcomment () {
      await this.$store.dispatch('episode/addComment', { mainid: this.$route.query.id, epid: this.store._id, comment: this.comment })
    },
    loadcomm () {
      this.loadComment(this.store._id)
    }
  }
}
</script>

<style>
</style>
