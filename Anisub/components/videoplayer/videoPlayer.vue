<template>
  <div id="video_box">
    <video
      id="my_Player"
      class="videoplayer"
      width="100%"
      preload="metadata"
    >
      <source :src="url" type="video/mp4">
    </video>
    <div id="video_overlay">
      <v-col class="pa-0 ma-0">
        <v-slider
          v-model="slider"
          track-color="rgba(0, 0, 0, 0.3)"
          :max="video.max"
          dense
          hide-details
          @change="Seeker()"
        />
        <v-row no-gutters>
          <v-col cols="1">
            <btn :icon="`${clickedPlayBtn?'pause':'play'}`" :tooltip="`${clickedPlayBtn?'Pause':'Play'}`" @clicked="PlayandPause" />
          </v-col>
          <v-col cols="1">
            <btn :icon="volumeIcon" tooltip="Volume" @clicked="`${$vuetify.breakpoint.smAndUp?SliderHideShow():mute()}`" />
          </v-col>
          <v-col v-if="sliderShow" cols="2" class="mr-2 pa-0">
            <v-slider
              v-if="sliderShow"
              v-model="volume"
              dense
              :min="vol.min"
              :max="vol.max"
              hide-details
            />
          </v-col>
          <div class="overline ml-2">
            {{ `${current}/${endTime}` }}
          </div>
          <v-spacer />
          <v-col cols="5">
            <v-row justify="end" dense no-gutters>
              <btn icon="cog" tooltip="settings" />
              <btn icon="card-minus-outline" tooltip="Play" @clicked="Seeker" />
              <btn icon="fullscreen" tooltip="FullScreen" @clicked="fullScreen" />
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import btn from '../btn/btn.vue'
const convertTimeHHMMSS = (val) => {
  const hhmmss = new Date(val * 1000).toISOString().substr(11, 8)

  return hhmmss.indexOf('00:') === 0 ? hhmmss.substr(3) : hhmmss
}
export default {
  components: { btn },
  props: {
    url: {
      type: String,
      default: ''
    },
    postid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      id: `/api/post/episode/watch/${this.postid}&${this.url}`,
      src: '',
      current: '00:00',
      endTime: '00:00',
      slider: 0,
      sliderShow: false,
      clickedPlayBtn: false,
      clickedVolumeBtn: false,
      volumeIcon: 'volume-high',
      volume: 100,
      vol: {
        min: 0,
        max: 100
      },
      video: {
        min: 0,
        max: 0
      }
    }
  },
  computed: {
    thumbvalue () {
      return convertTimeHHMMSS(this.slider)
    }
  },
  watch: {
    volume (value) {
      const vid = document.getElementById('my_Player')
      vid.volume = this.volume / 100
      switch (vid.volume) {
        case 0:
          this.volumeIcon = 'volume-off'
          break
        case 35:
          this.volumeIcon = 'volume-low'
          break
        case 70:
          this.volumeIcon = 'volume-medium'
          break
        case 100:
          this.volumeIcon = 'volume-high'
          break
        default:
          break
      }
    }
  },
  mounted () {
    const vid = document.getElementById('my_Player')
    vid.addEventListener('timeupdate', this.update)
    vid.addEventListener('timeupdate', this.loadEndtime)
    vid.addEventListener('change', this.Seeker)
  },
  methods: {
    SliderHideShow () {
      this.sliderShow = !this.sliderShow
    },
    PlayandPause () {
      const vid = document.getElementById('my_Player')
      vid.paused ? vid.play() : vid.pause()
      this.clickedPlayBtn = !this.clickedPlayBtn
    },
    Seeker () {
      const vid = document.getElementById('my_Player')
      vid.currentTime = this.slider
    },
    mute () {
      this.volume === 0 ? this.volume = 100 : this.volume = 0
      this.clickedVolumeBtn = !this.clickedVolumeBtn
      switch (this.volume) {
        case 0:
          this.volumeIcon = 'volume-off'
          break
        case 100:
          this.volumeIcon = 'volume-high'
          break

        default:
          break
      }
    },
    loadEndtime () {
      const vid = document.getElementById('my_Player')
      this.endTime = convertTimeHHMMSS(parseInt(vid.duration))
    },
    fullScreen () {
      const vid = document.getElementById('my_Player')
      vid.webkitRequestFullScreen()
      vid.removeAttribute('controls')
    },
    update (e) {
      const vid = document.getElementById('my_Player')
      this.slider = parseInt(vid.currentTime)
      this.video.max = parseInt(vid.duration)
      this.durationSeconds = convertTimeHHMMSS(parseInt(vid.duration))
      this.current = convertTimeHHMMSS(vid.currentTime)
    }
  }
}
</script>

<style>
.outer-container {
    border: 1px dotted black;
    width: 99%;
    height: 100%;
    text-align: center;
}
#video_box {
    border: 1px solid black;
    display: inline-block;
    position: relative;
    width: 100%;
    height: 98%;
}
#video_overlay{
    position: absolute;
    width: 100%;
    left: 0px;
    bottom: 0px;
    padding: 5px 5px;
    font-size: 20px;
    font-family: Helvetica;
    color: #FFF;
    background-color: rgba(0, 0, 0, 0.3);
}
video::-webkit-media-controls {
  display:none !important;
}
</style>
