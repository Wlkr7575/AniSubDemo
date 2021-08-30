<template>
  <div>
    <v-toolbar dense flat>
      <v-row justify-space-around>
        <v-col cols="4" md="2">
          <v-select
            v-if="$vuetify.breakpoint.smAndUp"
            v-model="AtoZAcsorDesc"
            :items="BottomSheetData.data"
            item-text="text"
            item-value="i"
            label="Sort"
            :disabled="check"
            prepend-icon="mdi-sort"
            :color="`${$vuetify.theme.dark ?'error' :'primary'}`"
            :item-color="`${$vuetify.theme.dark ?'error' :'primary'}`"
            dense
            solo
            hide-details
          />
          <bottomsheet v-else :list-data="BottomSheetData.data" :main-icon="BottomSheetData.icon" :done="alphaF" />
        </v-col>
        <v-spacer />
        <v-col cols="8" md="4">
          <v-text-field
            v-model="search"
            dense
            hide-details
            :disabled="check"
            outlined
            prepend-inner-icon="mdi-magnify"
            label="Search something ..."
            single-line
            :color="`${$vuetify.theme.dark?'error':'primary'}`"
          />
        </v-col>
      </v-row>
    </v-toolbar>
    <v-container>
      <v-layout row wrap justify-start justify-space-around>
        <v-flex v-for="item in filterAnimes" :key="item._id" class="ma-2">
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
    </v-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import bottomsheet from '~/components/comp/bottomsheet.vue'
export default {
  components: { bottomsheet },
  data () {
    return {
      load: false,
      alphaDraw: false,
      filterDraw: false,
      offset: true,
      offset1: true,
      btnGroup: false,
      sheet: false,
      alpha: { Asc: false, Desc: false },
      Date: { Asc: false, Desc: false },
      AlphaAsc: undefined,
      FilterAsc: undefined,
      search: '',
      AtoZAcsorDesc: '',
      NewtoOldAcsOrDesc: '',
      Alphabet: [
        { text: 'A-Z', callback: () => this.setroom('hi') },
        { text: 'Z-A', callback: () => this.alphaF(1) }
      ],
      Filter: [
        { text: 'Newest', callback: () => this.FtrF(0) },
        { text: 'Oldest', callback: () => this.FtrF(0) }
      ],
      BottomSheetData: {
        icon: 'mdi-sort',
        data: [
          { text: 'A-Z', icon: 'mdi-sort-alphabetical-ascending', i: 0 },
          { text: 'Z-A', icon: 'mdi-sort-alphabetical-descending', i: 1 },
          { text: 'Шинэ', icon: 'mdi-sort-calendar-ascending', i: 2 },
          { text: 'Хуучин', icon: 'mdi-sort-calendar-descending', i: 3 },
          { text: 'Хамгийн их таалагдсан', icon: 'mdi-sort-calendar-descending', i: 4 },
          { text: 'Хамгийн бага таалагдсан', icon: 'mdi-sort-calendar-descending', i: 5 }
        ]
      }
    }
  },
  computed: {
    ...mapState({ animes: state => state.store.data.map((p) => { const name = p.name; const imgUrl = p.imgUrl; const _id = p._id; const createdAt = p.createdAt; const likes = p.likes.length; return { _id, name, imgUrl, createdAt, likes } }) }),
    filterAnimes () {
      const Sort = this.animes
      const select = this.search
      if (select) {
        return this.animes.filter(function (item) { return item.name.toLowerCase().includes(select) })
      }
      if (this.sortMethodAlph !== '') {
        switch (this.sortMethodAlph) {
          case 'aASC':
            return Sort.sort((a, b) => { if (a.name.toLowerCase() < b.name.toLowerCase()) { return -1 } if (a.name.toLowerCase() > b.name.toLowerCase()) { return 1 } return 0 })
          case 'aDESC':
            return Sort.sort((a, b) => { if (b.name.toLowerCase() < a.name.toLowerCase()) { return -1 } if (b.name.toLowerCase() > a.name.toLowerCase()) { return 1 } return 0 })
          case 'fASC':
            return Sort.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt) })
          case 'fDESC':
            return Sort.sort(function (a, b) { return new Date(a.createdAt) - new Date(b.createdAt) })
          case 'lASC':
            return Sort.sort((a, b) => { if (b.likes < a.likes) { return -1 } if (b.likes > a.likes) { return 1 } return 0 })
          case 'lDESC':
            return Sort.sort((a, b) => { if (a.likes < b.likes) { return -1 } if (a.likes > b.likes) { return 1 } return 0 })
          default:
            return this.animes
        }
      } else {
        return this.animes
      }
    },
    sortMethodAlph () {
      switch (this.AtoZAcsorDesc) {
        case 0:
          return 'aASC'
        case 1:
          return 'aDESC'
        case 2:
          return 'fASC'
        case 3:
          return 'fDESC'
        case 4:
          return 'lASC'
        case 5:
          return 'lDESC'
        default:
          return ''
      }
    },
    check () {
      return !this.animes
    }
  },
  methods: {
    async alphaF (files) {
      this.AtoZAcsorDesc = await files
    }
  }
}
</script>
<style>
#row{
  color: rgb(255, 255, 255);
  margin: 0;
  box-shadow: 0 0 20px inset rgba(0, 0, 0, 0.4);background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 72px);
}
</style>
