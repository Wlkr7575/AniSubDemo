<template>
  <div>
    <v-container>
      <v-data-table
        :headers="tableheaders"
        :items="animes"
        :search="search"
        :loading="check"
        sort-by="calories"
        class="elevation-1"
      >
        <template #top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Anime List</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              :color="`${$vuetify.theme.dark?'error':'primary'}`"
              label="Search"
              single-line
              hide-details
            />
            <v-spacer />
            <v-dialog
              v-model="dialog"
              max-width="800px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                  :color="`${$vuetify.theme.dark?'error':'primary'}`"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Add Anime
                </v-btn>
              </template>
              <v-card>
                <newanime :postid="updateId?updateId:''" />
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <deleteanime />
            </v-dialog>
            <v-dialog v-model="newEpDialog" max-width="500px">
              <v-toolbar flat>
                <v-toolbar-title>{{ dialogName }}</v-toolbar-title>
                <v-spacer />
                <v-btn depressed @click="newEpDialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-toolbar>
              <newepisode :id="newEpId?newEpId:''" />
            </v-dialog>
          </v-toolbar>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteItem(item._id)"
          >
            mdi-delete
          </v-icon>
          <v-icon
            small
            @click="addEpisode(item._id,item.name)"
          >
            mdi-plus
          </v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import newanime from '../CRUD/new.vue'
import deleteanime from '../CRUD/delete.vue'
import newepisode from '../CRUD/newEpisode.vue'
export default {
  components: { newanime, deleteanime, newepisode },
  data () {
    return {
      search: '',
      isloading: true,
      btnLoading: false,
      dialog: false,
      dialogDelete: false,
      newEpDialog: false,
      dialogName: '',
      data: '',
      expanded: [],
      singleExpand: false,
      updateId: '',
      newEpId: '',
      tableheaders: [
        { text: 'Нэр', value: 'name' },
        { text: 'ID', value: '_id' },
        { text: '', value: 'data-table-expand' },
        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  computed: {
    ...mapState({ animes: state => state.store.data.map((p) => { const name = p.name; const _id = p._id; return { name, _id } }) }),
    check () {
      return !this.animes
    }
  },
  methods: {
    ...mapActions({ delete: 'store/DeletePost' }),
    loginUser (id) {
      this.btnLoading = true
      this.delete(id).then(() => {
        this.btnLoading = false
      })
    },
    update (animeId) {
      this.$router.push({ path: '/admin/controller/add', query: { id: animeId } })
    },
    editItem (item) {
      this.updateId = item._id
      this.dialog = !this.dialog
    },
    deleteItem (id) {
      this.btnLoading = true
      this.delete(id).then((result) => {
        this.btnLoading = false
      })
    },
    addEpisode (id, name) {
      this.newEpId = id
      this.dialogName = name
      this.newEpDialog = !this.newEpDialog
    }
  }
}
</script>

<style>

</style>
