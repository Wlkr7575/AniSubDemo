<template>
  <div>
    <v-btn v-if="!isloggedin" to="/signin">
      Signin
    </v-btn>
    <div v-if="isloggedin">
      <v-menu
        v-if="$vuetify.breakpoint.smAndUp"
        bottom
        min-width="200px"
        rounded
        offset-y
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            x-large
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="36px" :color="`${$vuetify.theme.dark?'error':'primary'}`">
              <span class="white--text text-h5">{{ user.name.substr(0, 1) }}</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                :color="`${$vuetify.theme.dark?'error':'primary'}`"
              >
                <span class="white--text text-h5">{{ user.name.substr(0, 1) }}</span>
              </v-avatar>
              <h3>{{ user.name }}</h3>
              <p class="text-caption mt-1">
                {{ user.email }}
              </p>
              <v-divider class="my-3" />
              <v-btn
                depressed
                rounded
                text
                to="/profile"
              >
                Edit Account
              </v-btn>
              <v-divider class="my-3" />
              <v-btn
                depressed
                rounded
                text
                @click="logout"
              >
                Sign-Out
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isloggedin', 'user'],
  methods: {
    async logout () {
      await this.$store.dispatch('todos/logout')
    }
  }
}
</script>

<style>

</style>
