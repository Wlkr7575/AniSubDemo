<template>
  <v-app>
    <navbar :user="userData" :isloggedin="isLoggedin" :fetchdata="load" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import navbar from '../components/main/Navbar.vue'
export default {
  components: { navbar },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      load: false,
      search: '',
      avatarSpan: '',
      items: [
        {
          icon: 'mdi-home-variant-outline',
          title: 'Нүүр',
          to: '/'
        },
        {
          icon: 'mdi-apps',
          title: 'Жагсаалт',
          to: '/inspire'
        },
        {
          icon: 'mdi-account-tie',
          title: 'Админ',
          to: '/admin/anime'
        }
      ],
      miniVariant: false,
      right: true,
      title: 'AniSub',
      userRecord: []
    }
  },
  computed: {
    ...mapState({ userData: state => state.todos.user, isLoggedin: state => state.todos.isloggedin }),
    checkData () {
      return this.$store.state.store.data
    }
  },
  async mounted () {
    if (this.checkData != null || !this.Product.length) {
      this.load = true
      await this.fetch()
      this.load = false
    }
    if (this.$auth.$storage.getLocalStorage('data')) {
      await this.user()
    }
  },
  methods: {
    ...mapActions({ fetch: 'store/fetchAnimes' }),
    ...mapActions({ user: 'todos/fetchUser' })
  }
}
</script>
