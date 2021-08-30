<template>
  <v-sheet>
    <v-container>
      <v-row>
        <file-base64
          :done="wallpaper"
        />
        <file-base64
          :done="episode"
        />
      </v-row>
      <v-btn :loading="loading" block :disabled="disablebtn" @click="upload">
        upload
        <v-icon>mdi-cloud-upload-outline</v-icon>
      </v-btn>
    </v-container>
  </v-sheet>
</template>

<script>
/* eslint-disable no-console */
import fileBase64 from '../vuefilebase64.vue'
export default {
  components: { fileBase64 },
  props: { id: { type: String, default: '' } },
  data () {
    return {
      img: '',
      video: '',
      loading: false
    }
  },
  computed: {
    disablebtn () {
      return !!(this.img && this.video === '')
    },
    fuck () {
      return ' fuck you'
    }
  },
  methods: {
    wallpaper (files) {
      console.log(files)
      this.img = files.base64
    },
    episode (files) {
      console.log(files)
      this.video = files.base64
    },
    async upload () {
      this.loading = true
      const post = { img: this.img, episode: this.video }
      const id = this.id
      console.log(post)
      await this.$store.dispatch('episode/addEpisode', { id, post })
      this.loading = false
    }
  }
}
</script>

<style>

</style>
