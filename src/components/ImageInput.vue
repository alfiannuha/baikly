<template>
  <div>
    <div @click="launchFile()">
      <slot name="activator"></slot>
    </div>
    <input type="file"
       ref="file"
       accept="image/x-png,image/gif,image/jpeg"
       :name="filename"
       v-on:change="changeImage($event.target.files)"
       style="display:none">
    <v-dialog 
      v-model="dialog"
      width="500">
      <v-card
        class="pa-0 ma-0"
        flat>
        <v-card
          color="red accent-2">
          <v-list-item>
            <v-list-item-avatar color="red accent-2" size="30">
              <v-icon color="white" large>mdi-alert</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-card-text class="caption white--text pa-0">
                {{ response }}
              </v-card-text>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { get, post, put, destroy, upload} from "@/service/Axios";
export default {
  name: 'image-input',
  data: () => ({
    dialog: false,
    filename: 'file',
    process: {
      run: false
    },
    response: ''
  }),
  methods: {
    launchFile () {
      this.$refs.file.click()
    },
    async changeImage (file) {
      let image = file[0]
      if (file.length > 0) {
        if (image.type != 'image/jpg' && image.type != 'image/jpeg' && image.type != 'image/png') {
          this.dialog = true
          this.response = 'Silahkan pilih gambar dengan format .jpg / .jpeg / .png'
        } else if (image.size > 5242880) {
          this.dialog = true
          this.response = 'Maksimal gambar 5MB'
        } else {
          let formData = new FormData()
          formData.append('source','upload')
          formData.append('file', image)
          formData.append('title',`Gambar user`)
          this.$store.state.process.run = true
          this.$emit("input", {
            add : this.process.run
          })
          await upload(`storage/v1/media/upload`,{
            data: formData
          }).then((response) => {
            let res = response.data
            if (res.status == 200) {
              this.$store.state.process.run = false
              this.$emit("input", {
                url: res.data.public_url,
                add : this.process.run
              })
            }else{
              this.$emit("input", {
                add : ''
              })
              this.dialog = true
              this.$store.state.process.run = false
              this.response = res.message
              setTimeout(() => {
                this.$emit("input", null)
              }, 300);
            }
          })
        }
      }
    }
  }
}
</script>