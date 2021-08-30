/* eslint-disable no-console */
const state = () => ({
  data: []
})

const mutations = {
  Loggein (state) {
    state.isLoggedin = !state.isLoggedin
  },
  addedPost (state, payload) {
    state.data.push(payload)
  },
  getPost (state, payload) {
    state.data = payload.data
  },
  updatePost (state, payload) {
    const updatedpost = state.data.map(p => p._id === payload._id ? payload : p)
    state.data = updatedpost
  },
  deletePost (state, payload) {
    const i = state.data.filter(p => p._id !== payload)
    state.data = i
    // state.data.splice(i)
  },
  likePost (state, payload) {
    // const index = state.data.findIndex(p=>p._id === payload.)
    console.log(payload.data)
    const updatepost = state.data.map(p => p._id === payload.data._id ? payload.data : p)
    console.log(updatepost)
    state.data = updatepost
  }
}
const actions = {
  async createPost ({ commit }, payload) {
    await this.$axios.post('/api/post/add', payload).then((added) => {
      commit('addedPost', added.data)
    })
  },
  async fetchAnimes ({ commit }) {
    await this.$axios.get('/api/post/').then((anime) => {
      commit('getPost', anime)
    })
  },
  async DeletePost ({ commit, getters }, payload) {
    await this.$axios.delete(`/api/post/${payload}`).then(() => {
      alert('complate')
      commit('deletePost', payload)
    })
  },
  async updatePost ({ commit, getters }, payload) {
    await this.$axios.patch(`/api/post/${payload.id}`, payload.post).then((a) => {
      commit('updatePost', a.data)
    })
  },
  async likePost ({ commit }, payload) {
    if (this.$auth.$storage.getLocalStorage('data')) {
      console.log(this.$auth.$storage.getLocalStorage('data').token)
      this.$axios.setHeader('Authorization', `${this.$auth.$storage.getLocalStorage('data').token}`)
    }
    await this.$axios.patch(`/api/post/${payload}/likePost`).then((a) => {
      commit('likePost', a)
    })
  },
  async addEpisode ({ commit }, payload) {
    await this.$axios.post(`/api/post/episode/${payload.id}`, payload.post).then((added) => {
      alert('added new episode')
      console.log(added)
    }).catch((error) => { console.log(error) })
  }
}
const getters = {
  async data (state) {
    return await state.data
  },
  eventDetails: state => (id) => {
    console.log(id)
    return state.data.find(detail => detail._id === id)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
