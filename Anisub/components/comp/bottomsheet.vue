<template>
  <v-bottom-sheet
    v-model="sheet"
    persistent
  >
    <template #activator="{ on, attrs }">
      <v-btn
        v-bind="attrs"
        depressed
        class="mr-2"
        v-on="on"
      >
        <v-icon>
          {{ mainIcon }}
        </v-icon>
      </v-btn>
    </template>
    <v-sheet
      class="text-center"
      height="250px"
    >
      <v-btn
        class="mt-6"
        text
        block
        color="error"
        @click="sheet = !sheet"
      >
        close
      </v-btn>
      <div class="py-3">
        <v-list dense>
          <v-list-item-group
            v-model="selectedItem"
            @change="passData"
          >
            <v-list-item
              v-for="(item, i) in listData"
              :key="i"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon" />
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="`${item.text ==='A-Z'||item.text ==='Z-A'?'Үсгийн Дараалалаар':''} ${item.text}`" />
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
/* eslint-disable*/
export default {
  props: ['mainIcon', 'listData'],
  props:{
    mainIcon:{
      type: String,
      default: ''
    },
    listData:{
      type:Array,
      default:[]
    },
    done: {
      type: Function,
      default: () => {}
    },
  },
  data () {
    return {
      sheet: false,
      selectedItem: undefined
    }
  },
  methods:{
    passData(){
      console.log(this.selectedItem)
      this.done(this.selectedItem)
    }
  }
}
</script>

<style>

</style>
