export default function ({ $axios }) {
  // Create a custom axios instance
  const api = $axios.create({ baseURL: 'http://localhost:3001/api' })
  api.onRequest((req) => {
    if (this.$auth.$storage.getLocalStorage('data')) {
      req.headers.Authorization = `Bearer ${JSON.parse(this.$auth.$storage.getLocalStorage('data')).token}`
    }
  })
}
