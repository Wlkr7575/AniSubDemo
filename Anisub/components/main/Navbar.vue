<template>
  <nav>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list v-if="isloggedin && $vuetify.breakpoint.xs ">
        <!-- <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-avatar size="36px" :color="`${$vuetify.theme.dark?'error':'primary'}`">
              <span class="white--text text-h5">{{ user.name.substr(0, 1) }}</span>
            </v-avatar>
          </v-list-item-avatar>
        </v-list-item> -->

        <v-list-item link to="/profile">
          <v-list-item-avatar>
            <v-avatar size="36px" :color="`${$vuetify.theme.dark?'error':'primary'}`">
              <span class="white--text text-h5">{{ user.name.substr(0, 1) }}</span>
            </v-avatar>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-btn
            icon
            @click="logout"
          >
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </v-list-item>
      </v-list>

      <v-divider />
      <v-list v-if="!fetchdata" rounded>
        <v-list-item-group
          v-model="selectedItem"
          :color="`${$vuetify.theme.dark?'error':'primary'}`"
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <skeleton v-else skeletontype="list-item" />
    </v-navigation-drawer>
    <v-app-bar
      v-if="!load"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title color="white" class="font-weight-light" v-text="title" />
      <v-btn
        x-small
        icon
        class="ml-2"
        @click="$vuetify.theme.dark=!$vuetify.theme.dark"
      >
        <v-icon>
          mdi-{{ `${$vuetify.theme.dark ? 'white-balance-sunny' : 'moon-waning-crescent'}` }}
        </v-icon>
      </v-btn>
      <v-spacer />
      <v-text-field v-if="$vuetify.breakpoint.smAndUp" v-model="search" :color="`${$vuetify.theme.dark ?'white':'black'}`" class="mt-5" label="Search" />
      <v-spacer />
      <user v-if="!fetchdata" :isloggedin="isloggedin" :user="user" />
      <skeleton v-else skeletontype="avatar" />
    </v-app-bar>
  </nav>
</template>

<script>
import skeleton from '../comp/skeletonloader.vue'
import user from '../main/UserAction.vue'
export default {
  components: { skeleton, user },
  props: ['user', 'isloggedin', 'fetchdata'],
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      load: false,
      search: '',
      avatarSpan: '',
      selectedItem: 1,
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
  methods: {
    async logout () {
      await this.$store.dispatch('todos/logout')
    }
  }
}
</script>

<style>

</style>
