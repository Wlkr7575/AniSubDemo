/* eslint-disable no-console */
const state = () => ({
  user: {},
  mylist: [],
  isloggedin: false
})

const mutations = {
  signin (state, payload) {
    const userData = payload.data
    state.user = userData.result
    this.$auth.$storage.setLocalStorage('data', userData)
    state.isloggedin = true
  },
  signup (state, payload) {
    const userData = payload.data
    state.user = userData.result
    this.$auth.$storage.setLocalStorage('data', userData)
    state.isloggedin = true
  },
  logout (state, payload) {
    state.user = null
    state.isloggedin = null
  },
  fetchUser (state, payload) {
    state.user = payload
    state.isloggedin = true
  },
  fetchlist (state, payload) {
    state.mylist = payload.data
  }
}

const actions = {
  async fetchUser ({ commit, dispatch }) {
    const data = await this.$auth.$storage.getLocalStorage('data').result
    commit('fetchUser', data)
    dispatch('fetchlist')
  },
  async signin ({ commit }, user) {
    await this.$axios.post('/api/user/signin', user).then((user) => {
      commit('signin', user)
      this.$router.push('/')
    }).catch((err) => { console.log(err) })
  },
  async signup ({ commit }, user) {
    await this.$axios.post('/api/user/signup', user).then((user) => {
      commit('signup', user)
      this.$router.push('/')
    }).catch((err) => {
      console.log(err)
    })
  },
  async addlist ({ commit, state }, user) {
    await this.$axios.post(`/api/user/addlist/${state.user._id}`, user).then((result) => {
      commit('addlists', result)
      alert('Done')
    }).catch((err) => {
      console.log(err)
    })
  },
  async fetchlist ({ commit, state }, user) {
    await this.$axios.get(`/api/user/fetchlist/${state.user._id}`).then((result) => {
      commit('fetchlist', result)
    }).catch((err) => {
      console.log(err)
    })
  },
  async logout ({ commit }) {
    await this.$auth.$storage.removeLocalStorage('data')
    commit('logout', false)
    this.$router.push('/')
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
