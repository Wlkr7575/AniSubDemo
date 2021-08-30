<template>
  <v-card>
    <v-container>
      <v-row>
        <file-base64
          :done="wallpaper"
        />
        <file-base64
          :done="episode"
        />
      </v-row>
      <v-btn :loading="loading" @click="upload">
        upload
      </v-btn>
    </v-container>
  </v-card>
</template>

<script>
/* eslint-disable no-console */
import fileBase64 from '../../../components/vuefilebase64.vue'
export default {
  components: { fileBase64 },
  data () {
    return {
      img: '',
      video: '',
      loading: false
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
      const id = this.$route.query.id
      console.log(post)
      await this.$store.dispatch('episode/addEpisode', { id, post })
      this.loading = false
    }
  }
}
</script>

<style>

</style>
