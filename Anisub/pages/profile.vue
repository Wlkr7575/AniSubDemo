<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400" :loading="checkfile">
        <v-img
          height="200px"
          :src="backUrl?backUrl:localBackUrl"
        >
          <v-app-bar
            flat
            color="rgba(0, 0, 0, 0)"
          >
            <v-spacer />
            <v-menu
              bottom
              left
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in menuitem"
                  :key="i"
                  @click="BackGround(i)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-app-bar>
        </v-img>
        <v-card-title class="white--text mt-0">
          <v-dialog
            v-model="dialog"
            width="500"
          >
            <template #activator="{ on, attrs }">
              <v-avatar size="56" v-bind="attrs" :color="`${proUrl?'':$vuetify.theme.dark?'error':'primary'}`" v-on="on">
                <v-img v-if="proUrl" :src="proUrl" />
                <span v-else class="white--text text-h5">{{ user.name.substr(0, 1) }}</span>
              </v-avatar>
            </template>
            <v-container>
              <filebase64 :done="profilePicUrl" />
            </v-container>
          </v-dialog>
          <v-col class="pa-0">
            <p class="ml-3 mb-0" :color="`${$vuetify.theme.dark?'black':''}`">
              {{ user.name }}
            </p>
            <p class="ml-3 caption font-weight-light text--secondary">
              {{ user.email }}
            </p>
          </v-col>
        </v-card-title>
        <mylist v-if="mylist" :items="mylist.list" />
      </v-card>
    </v-row>
    <v-dialog v-model="backDialog" width="500">
      <v-card>
        <v-container>
          <filebase64 :done="backPicUrl" />
        </v-container>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import filebase64 from '../components/vuefilebase64.vue'
import mylist from '../components/list/mylist.vue'
export default {
  components: { filebase64, mylist },
  data () {
    return {
      dialog: false,
      backDialog: false,
      menuitem: [
        { title: 'Change Background' },
        { title: 'Remove' }
      ],
      localProUrl: 'https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg',
      localBackUrl: '/placeholder.jpg',
      proUrl: '',
      backUrl: ''
    }
  },
  computed: {
    ...mapState({ user: state => state.todos.user, mylist: state => state.todos.mylist, isloggedin: state => state.todos.isloggedin }),
    checkfile () {
      return !this.user
    }
  },
  methods: {
    ...mapActions({ fetchmylist: 'todos/fetchlist' }),
    profilePicUrl (file) {
      this.proUrl = file.base64
      this.dialog = false
    },
    backPicUrl (file) {
      this.backUrl = file.base64
      this.backDialog = false
    },
    BackGround (index) {
      switch (index) {
        case 0:
          this.backDialog = true
          break
        case 1:
          if (!this.backUrl === '') { this.backUrl = '' }
          break
        default:
          break
      }
    }
  }
}
</script>

<style>

</style>
