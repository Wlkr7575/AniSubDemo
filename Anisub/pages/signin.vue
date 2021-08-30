<template>
  <v-container fill-height fluid>
    <v-row
      align="center"
      justify="center"
    >
      <v-card width="500">
        <v-toolbar>
          <v-toolbar-title>{{ isSignUp?'SignUp':'Login' }}</v-toolbar-title>
        </v-toolbar>
        <v-container>
          <div v-if="isSignUp">
            <v-text-field v-model="data.Name" label="Name" />
          </div>
          <v-text-field v-model="data.email" label="Email" />
          <v-text-field v-model="data.password" label="Password" />
          <!--           <div v-if="isSignUp">
            <v-text-field v-model="data.confirmPassword" label="ConfirmPassword" />
          </div> -->
          <v-btn :color="`${$vuetify.theme.dark?'error':'primary'}`" :loading="loading" block @click="login()">
            {{ isSignUp?'SignUp':'Login' }}
          </v-btn>
          <div class="text-center">
            <p v-if="isSignUp">
              I have account: <a @click="setIsSignUp">Login</a>
            </p>
            <p v-else>
              I don't have account: <a @click="setIsSignUp">Register</a>
            </p>
          </div>
        </v-container>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      data: {
        Name: '',
        email: '',
        password: ''
        /*         confirmPassword: '' */
      },
      isSignUp: false,
      loading: false
    }
  },
  methods: {
    async login () {
      this.loading = true
      if (this.isSignUp) {
        await this.$store.dispatch('todos/signup', this.data)
      } else {
        const user = { email: this.data.email, password: this.data.password }
        await this.$store.dispatch('todos/signin', user)
      }
      this.loading = false
    },
    setIsSignUp () {
      this.isSignUp = !this.isSignUp
    }
  }
}
</script>

<style>
</style>
