<template>
  <v-container>
    <alert :ok="snackBar" :name="formData.NameValue" :type="check?'засагдлаа':'бүртгэгдлээ'" />
    <v-card>
      <v-container>
        <v-form>
          <v-text-field v-model="formData.NameValue" :rules="FormRule.name" class="mt-4" label="Нэр" />
          <v-textarea
            v-model="formData.textAreaValue"
            name="input-7-1"
            label="Тайлбар"
            :rules="FormRule.description"
            hint="Эртээ урьдийн цагт гэх мэт"
            clearable
            clear-icon="mdi-close-circle"
          />
          <v-text-field v-model="formData.tags" label="Төрөлүүд" hint="Адал явдалт гэх мэт" />
          <v-row>
            <v-col cols="8" md="8">
              <v-text-field v-model="formData.Studio" label="Студио" :rules="FormRule.Studio" />
            </v-col><v-col cols="4" md="4">
              <v-text-field v-model="formData.Duration" :rules="FormRule.duration" label="Гарах хугацаа" />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col v-for="(item,i) in radioGroupValue" :key="i" cols="12" sm="3">
              <strong>{{ item[0].top }}</strong>
              <v-radio-group v-model="formData.radioGroup[i]" class="ml-2">
                <v-radio
                  v-for="(radio, index) in item"
                  :key="index"
                  :color="`${$vuetify.theme.dark?'error':'primary'}`"
                  :label="radio.text"
                  :value="radio.text"
                />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row justify="center" justify-space-between>
            <v-col v-for="(item,i) in formData.date" :key="i">
              <v-menu :ref="menu[i]" v-model="menu[i]" offset-y :close-on-content-click="false">
                <template #activator="{ on, attrs }">
                  <v-text-field v-model="formData.date[i]" :label="`${i == 'startedAt'?'Эхэлсэн огноо':'Дууссан огноо'}`" v-bind="attrs" v-on="on" />
                </template>
                <v-date-picker v-model="formData.date[i]" />
              </v-menu>
            </v-col>
          </v-row>
          <v-layout depressed justify-space-around>
            <file-base64
              v-for="item in 2"
              :key="item"
              :done="getFiles"
              :title="item"
            />
          </v-layout>
          <v-layout row justify-space-between>
            <v-btn class="ma-2" depressed>
              clear
            </v-btn>
            <v-btn class="ma-2" :color="`${$vuetify.theme.dark?'error':'primary'}`" :loading="actionLoading" depressed @click="upload(updateId)">
              {{ check? 'Update': 'Upload' }}
            </v-btn>
          </v-layout>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable no-console */
import { mapState } from 'vuex'
import Alert from '../../../components/alert.vue'
import fileBase64 from '../../../components/vuefilebase64.vue'
export default {
  components: { fileBase64, Alert },
  data () {
    return {
      radioGroupValue: {
        age: [{ text: '5', top: 'Анимэ үзэх насны ангилал' }, { text: '13' }, { text: '16' }, { text: '18' }, { text: '21' }],
        source: [{ text: 'Orignal', top: 'Эх зохиол' }, { text: 'Manga' }, { text: 'Light Novel' }, { text: 'Visual Novel' }, { text: 'Manhwa' }],
        status: [{ text: 'ongoing', top: 'Төлөв' }, { text: 'finished' }],
        format: [{ text: 'Tv Series', top: 'Гарах төрөл' }, { text: 'Ova' }, { text: 'Ona' }, { text: 'Film' }, { text: 'Special' }]
      },
      formData: {
        NameValue: '',
        textAreaValue: '',
        Duration: '',
        Studio: '',
        tags: '',
        radioGroup: { age: '', source: '', status: '', format: '' },
        date: { startedAt: new Date().toISOString().substr(0, 10), endAt: new Date().toISOString().substr(0, 10) },
        imgUrl: { img1: '', img2: '' }
      },
      FormRule: {
        name: [v => !!v || 'Нэрийг бич'],
        description: [v => !!v || 'Тайлбар хоосон байна'],
        Studio: [v => !!v || 'Студи хоосон байна'],
        duration: [v => !!v || 'Гарах хугацаа хоосон байна', v => (!isNaN(parseFloat(v)) && v >= 0 && v <= 500) || '0 ээс 500 хоорондох тоо']
      },
      updateData: [],
      updateId: '',
      menu: { startedAt: false, endAt: false },
      actionLoading: false,
      snackBar: false
    }
  },
  computed: {
    ...mapState({ update: state => state.store.data.find(p => p._id === sessionStorage.getItem('ID')) }),
    check () {
      if (this.$route.query.id) {
        return true
      }
      return false
    },
    fetchedData () {
      const post = {
        NameValue: this.update.name,
        textAreaValue: this.update.Description,
        Duration: this.update.Duration,
        Studio: this.update.Studio,
        radioGroup: {
          age: this.update.Age,
          source: this.update.Source,
          status: this.update.Status,
          format: this.update.Format
        },
        date: {
          startedAt: this.update.startedAt,
          endAt: this.update.endAt
        },
        imgUrl: {
          img1: this.update.imgUrl.front,
          img2: this.update.imgUrl.back
        }
      }
      return post
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.updateId = this.$route.query.id
      sessionStorage.setItem('ID', this.$route.query.id)
      this.formData = this.fetchedData
    }
  },
  methods: {
    async getFiles (files) {
      const base64 = files.base64
      this.formData.imgUrl['img' + files.check] = await base64
    },
    async upload (id) {
      const post = {
        name: this.formData.NameValue,
        Age: this.formData.radioGroup.age,
        Source: this.formData.radioGroup.source,
        Studio: this.formData.Studio,
        Status: this.formData.radioGroup.status,
        Description: this.formData.textAreaValue,
        Duration: this.formData.Duration,
        Format: this.formData.radioGroup.format,
        imgUrl: { front: this.formData.imgUrl.img1, back: this.formData.imgUrl.img2 },
        startedAt: this.formData.date.startedAt,
        endAt: this.formData.date.endAt,
        tags: this.formData.tags.split(',')
      }
      console.log(id)
      if (id) {
        this.actionLoading = true
        await this.$store.dispatch('store/updatePost', { id, post }).then((update) => {
          this.updateData = update
          this.actionLoading = false
          this.snackBar = true
        })
      } else {
        this.actionLoading = true
        await this.$store.dispatch('store/createPost', post).then(() => {
          alert(post.name + 'нэртэй Анимэ амжилттай бүртгэгдлээ')
          this.actionLoading = false
          this.snackBar = true
        })
      }
    }
    // async updatePost (id) {
    //   const post = {
    //     name: this.formData.NameValue,
    //     Age: this.formData.radioGroup.age,
    //     Source: this.formData.radioGroup.source,
    //     Studio: this.formData.Studio,
    //     Status: this.formData.radioGroup.status,
    //     Description: this.formData.textAreaValue,
    //     Duration: this.formData.Duration,
    //     Format: this.formData.radioGroup.format,
    //     imgUrl: { front: this.formData.imgUrl.img1, back: this.formData.imgUrl.img2 },
    //     startedAt: this.formData.date.startedAt,
    //     endAt: this.formData.date.endAt
    //   }
    // }
  }
}
</script>

<style>
.v-input--radio-group__input{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.v-card--reveal {
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>
