<template>
  <div>
    <v-list>
      <v-list-item v-for="(item,i) in listdata" :key="i" @contextmenu="show">
        <v-list-item-avatar tile>
          <v-img :src="item.imgUrl.front" width="40" />
        </v-list-item-avatar>
        <v-list-item-content><v-list-item-title>{{ item.name }}</v-list-item-title><v-list-item-subtitle>{{ item._id }}</v-list-item-subtitle></v-list-item-content>
        <v-list-item-action>
          <v-btn icon :to="{path: '/detail/', query:{id:item._id}}">
            <v-icon color="grey lighten-1">
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-menu
      v-model="showMenu"
      :position-x="x"
      :position-y="y"
      absolute
      offset-y
    >
      <v-list>
        <v-list-item
          v-for="(item, index) in menus"
          :key="index"
          @click="menuAction"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
          <v-list-item-icon><v-icon>{{ `mdi-${item.icon}` }}</v-icon></v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog" width="470">
      <v-card>
        <v-card-title>Are you sure remove this from you watchlist?</v-card-title>
        <v-card-actions justify-space-between>
          <v-btn plain>
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn depressed :color="`${$vuetify.theme.dark?'error':'primary'}`" @click="sure">
            Sure
          </v-btn>
        </v-card-actions>
        <!-- <v-row justify-space-around>
          <v-btn>Sure</v-btn>
        </v-row> -->
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: ['items'],
  data () {
    return {
      showMenu: false,
      dialog: false,
      x: 0,
      y: 0,
      menus: [
        { title: 'remove', icon: 'delete' }
      ]
    }
  },
  computed: mapState({
    listdata (state) {
      return state.store.data.filter(p => this.items.includes(p._id))
    }
  }),
  methods: {
    ...mapActions({ fetchmylist: 'todos/fetchlist' }),
    show (e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    menuAction () {
      this.dialog = true
    },
    sure () {
      this.fetchmylist()
      this.dialog = false
    }
  }
}
</script>

<style>

</style>
