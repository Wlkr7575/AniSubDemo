/* eslint-disable no-console */
const state = () => ({
  episode: [],
  comment: [],
  paylist: 0
})
const mutations = {
  fetchEpisode (state, payload) {
    state.episode = payload.data
  },
  getWatch (state, payload) {
    const episode = payload.video
    const index = state.episode.findIndex(p => p._id === payload._id)
    state.episode[index].episode = episode
  },
  addComment (state, payload) {
    state.comment = payload
  }
}
const actions = {
  async addEpisode ({ commit }, payload) {
    console.log(payload.post)
    await this.$axios.post(`/api/post/episode/${payload.id}`, payload.post).then((added) => {
      alert('added new episode')
      console.log(added)
    })
  },
  async fetchEpisodes ({ commit }, payload) {
    await this.$axios.get(`/api/post/episode/${payload}`, payload.post).then((added) => {
      commit('fetchEpisode', added)
      console.log(added)
    })
  },
  async getWatch ({ commit }, payload) {
    await this.$axios.$get(`/api/post/episode/watch/${payload.id}&${payload.postid}`).then((result) => {
      commit('getWatch', { _id: payload.postid, video: result })
    })
  },
  async addComment ({ commit }, payload) {
    if (this.$auth.$storage.getLocalStorage('data')) {
      console.log(this.$auth.$storage.getLocalStorage('data').token)
      this.$axios.setHeader('Authorization', `${this.$auth.$storage.getLocalStorage('data').token}`)
    }
    await this.$axios.post('/api/post/comment', payload).then((result) => { console.log(result) })
  },
  async fetchComment ({ commit }, payload) {
    if (this.$auth.$storage.getLocalStorage('data')) {
      console.log(this.$auth.$storage.getLocalStorage('data').token)
      this.$axios.setHeader('Authorization', `${this.$auth.$storage.getLocalStorage('data').token}`)
    }
    await this.$axios.get(`/api/post/comment/${payload}`).then((result) => { commit('addComment', result.data) })
  }
}
const getters = {
  async episode (state) {
    return await state.episode
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
