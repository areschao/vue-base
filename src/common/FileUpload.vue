<template>
  <el-upload
    name="file"
    ref="upload"
    drag
    :action=action
    with-credentials
    :data=data
    :file-list="fileList"
    :on-success="uploadSuccess"
    :limit="1"
    multiple
    :auto-upload=autoUpload
  >
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>

<script>
  export default {
    data() {
      return {
        fileList: []
      }
    },
    props: {
      data: Object,
      action: String,
      autoUpload:Boolean
    },
    methods: {
      // 上传成功后的回调
      uploadSuccess(response, file, fileList) {
        console.log(response)
        this.$emit('uploadSuccess',response)
      },
      toSubmit(){
        this.$refs.upload.submit();
      },
      clearImg(){
        this.$refs.upload.clearFiles();
      }
    }
  }
</script>

<style scoped>

</style>
