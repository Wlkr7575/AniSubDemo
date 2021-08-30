<template>
  <div v-if="detail">
    <v-card>
      <v-img :src="detail.imgUrl.back" :height="`${$vuetify.breakpoint.smAndUp?'300':'200'}`">
        <v-row
          id="backRow"
          align="center"
          class="lightbox white--text fill-height"
          no-gutters
          style=""
        >
          <v-col
            class="fill-height d-flex flex-column justify-center align-end"
            cols="4"
            md="4"
          >
            <v-card :width="`${$vuetify.breakpoint.smAndUp?'180':'100'}`" elevation="0">
              <v-img :src="detail.imgUrl.front" :height="`${$vuetify.breakpoint.smAndUp?'250':'150'}`" :width="`${$vuetify.breakpoint.smAndUp?'180':'100'}`" elevation-="0" />
            </v-card>
          </v-col>
          <v-col
            cols="8"
            class="fill-height"
          >
            <v-row class="mx-auto fill-height" justify="start" align="center">
              <v-col class="fill-height d-flex flex-column justify-center align-start ml-2" cols="9">
                <div align="start" justify="center">
                  <span :class="`${$vuetify.breakpoint.smAndUp?'headline':'title'} font-weight-bold`" style="display: inline-block; overflow: hidden; text-overflow: ellipsis; width:100%;">
                    {{ detail.name }}
                  </span>
                  <!-- <v-row v-if="$vuetify.breakpoint.smAndUp" class="pl-4 pt-2">
                    <p v-for="(item, i) in detail.tags" :key="i" class="mb-0 text--secondary">
                      {{ `${item} ${taglength == i+1 ?'':','}` }}
                    </p>
                  </v-row> -->
                </div>
              </v-col>
              <v-col class="text-right fill-height d-flex flex-row justify-end align-end mr-2" cols="2">
                <v-btn dark outlined :icon="$vuetify.breakpoint.smAndUp? false:true" :class="`${$vuetify.breakpoint.smAndUp?'mr-2':'mr-3  '}`" @click="addlist({id:detail._id})">
                  <v-icon>
                    mdi-plus
                  </v-icon>
                  {{ `${$vuetify.breakpoint.smAndUp?'Add list':''}` }}
                </v-btn>
                <v-btn
                  align-end
                  depressed
                  justify-end
                  outlined
                  dark
                  @click="likeAction(detail._id)"
                >
                  <v-icon class="mr-2">
                    {{ liked ? 'mdi-thumb-up' : 'mdi-thumb-up-outline' }}
                  </v-icon>
                  {{ likeCount }}
                </v-btn>
                <!-- <p class="font-weight-regular pa-0 mt-2">
                      {{ `${likeCount}` }}
                    </p> -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-img>
      <v-container>
        <v-tabs fixed-tabs :color="$vuetify.theme.dark?'error':'primary'">
          <v-tab>Танилцуулга</v-tab>
          <v-tab-item>
            <div>
              {{ detail.Description?detail.Description:'Null' }}
            </div>
          </v-tab-item>
          <v-tab>Мэдээлэл</v-tab>
          <v-tab-item>
            <v-row class="pa-4" justify-space-between>
              <v-col>
                <v-card class="text-center font-weight-black" outlined>
                  <v-card-text class="pa-1">
                    Гарсан Огноо
                  </v-card-text>
                  <v-card-actions class="headline pa-0 font-weight-black">
                    <v-flex justify-center>
                      {{ Year?Year:'Null' }}
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="text-center font-weight-black" outlined>
                  <v-card-text class="pa-1">
                    Үнэлгээ
                  </v-card-text>
                  <v-card-actions class="headline pa-0 font-weight-black">
                    <v-flex justify-center>
                      {{ detail.rating?detai.rating:'Null' }}
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col>
                <v-card class="text-center font-weight-black" outlined>
                  <v-card-text class="pa-1">
                    Хугацаа
                  </v-card-text>
                  <v-card-actions class="headline pa-0 font-weight-black">
                    <v-flex justify-center>
                      {{ detail.Duration }}
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
            <v-row class="align-center justify-center">
              <v-chip v-for="(item, i) in detail.tags" :key="i" class="ma-2 ">
                {{ item }}
              </v-chip>
            </v-row>
            <v-row no-gutters class="pa-4">
              <v-col cols="12" sm="4" class="text-center">
                <h5>Төрөл: {{ detail.Format }}</h5>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h5>Төлөв: {{ detail.Status }}</h5>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h5>Эхэлсэн огноо: {{ detail.startedAt }}</h5>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h5>Дууссан огноо: {{ detail.endAt }}</h5>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h5>Студио: {{ detail.Studio }}</h5>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h5>Эх Зохиол: {{ detail.Source }}</h5>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h5>Насны ангилал: {{ detail.Age }}</h5>
              </v-col>
              <v-col cols="12" sm="4" class="text-center">
                <h5>Үзсэн тоо: {{ detail.views?views:'Nulal' }}</h5>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs>
        <v-row class="mt-2">
          <v-spacer />
          <v-btn plain @click="GorS('slide')">
            <v-icon>mdi-view-carousel</v-icon>
          </v-btn>
          <v-btn plain @click="GorS('grid')">
            <v-icon>mdi-view-grid</v-icon>
          </v-btn>
        </v-row>
      </v-container>
      <div v-if="load">
        <progres :color="`${$vuetify.theme.dark ?'error':'primary'}`" :size="36" text="Loading Episode" />
      </div>
      <div v-else>
        <!-- <slideg v-if="!choose" :episode="episode" /> -->
        <itemg v-if="choose" :episode="episode" />
        <itemslide v-if="!choose" :episode="episode" />
      </div>
    </v-card>
  </div>
  <div v-else justify-center align-center>
    <v-progress-circular indeterminate />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Itemg from '../components/itemg.vue'
import itemslide from '../components/list/itemslider.vue'
import progres from '../components/comp/loadProgress.vue'
export default {
  components: { Itemg, itemslide, progres },
  data () {
    return {
      liked: true,
      choose: false,
      load: false,
      model: ''
    }
  },
  computed: {
    ...mapState({ episode: state => state.episode.episode }),
    detail () {
      return this.$store.getters['store/eventDetails'](this.$route.query.id)
    },
    likeCount () {
      return this.detail.likes.length
    },
    taglength () {
      return this.detail.tags.length
    },
    Year () {
      return parseInt(this.detail.startedAt)
    }
  },
  // beforeCreate () {
  //   const _id = this.$route.query.id
  //   Object.assign(this.$options.computed, { ...mapState({ detail: state => state.store.data.find(p => p._id === _id) }) })
  // },
  mounted () {
    this.readEpisode(this.$route.query.id)
    const authToken = this.$auth.$storage.getLocalStorage('data').result._id
    if (this.detail) {
      const n = this.detail.likes.includes(authToken)
      if (!n) { this.liked = false }
    }
  },
  methods: {
    ...mapActions({ likePost: 'store/likePost', addlist: 'todos/addlist' }),
    readEpisode (id) {
      this.load = true
      this.$store.dispatch('episode/fetchEpisodes', id).then(() => { this.load = false })
    },
    likeAction (id) {
      this.liked = !this.liked
      this.likePost(id)
    },
    GorS (check) {
      if (check === 'grid') {
        this.choose = true
      } if (check === 'slide') {
        this.choose = false
      }
    },
    add () {

    }
  }
}
</script>

<style>
#backRow{
  /* box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.8); */
  background-image: linear-gradient(to top right, rgba(28, 28, 28, 0.33), rgba(21, 21, 21, 0.7));
  background-color: rgba(0, 0, 0, 0.153);
  margin: 0;
}
</style>
