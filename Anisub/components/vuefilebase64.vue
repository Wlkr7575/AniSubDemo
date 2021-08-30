<template>
  <v-file-input v-model="data" :label="`${title == 1 ?'Нүүр зураг':'Арын зураг'}`" type="file" :multiple="multiple" @change="onChange" />
</template>

<script>
export default {
  props: {
    // Support Multiple File?
    multiple: {
      type: Boolean,
      default: false
    },
    // Pass the files info when it's done
    done: {
      type: Function,
      default: () => {}
    },
    title: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      data: null
    }
  },
  methods: {
    onChange (e) {
      // get the files
      const files = this.data
      // Process each file
      const allFiles = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        // Make new FileReader
        const reader = new FileReader()
        // Convert the file to base64 text
        reader.readAsDataURL(file)
        // on reader load somthing...
        reader.onload = () => {
          // Make a fileInfo Object
          const fileInfo = {
            name: file.name,
            type: file.type,
            size: Math.round(file.size / 1000) + ' kB',
            base64: reader.result,
            check: this.title,
            file
          }
          // Push it to the state
          allFiles.push(fileInfo)
          // If all files have been proceed
          if (allFiles.length === files.length) {
            // Apply Callback function
            if (this.multiple) { this.done(allFiles) } else { this.done(allFiles[0]) }
          }
        } // reader.onload
      } // for
    } // onChange()
  }
}
</script>

<style>
input{
  color: red;
}
</style>
