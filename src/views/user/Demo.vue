<template>
<div class="demo">
  <van-button type='primary' @click='crop'>裁剪</van-button>
  <van-button type='primary'>取消</van-button>
    <vue-cropper img='https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1473836766,4030812874&fm=26&gp=0.jpg' autoCrop autoCropWidth='150' autoCropHeight=150 :fixed= true ref="cropper"></vue-cropper>
</div>
</template>

<script>
// 给父盒子指定宽度高，不能直接引入本地图片
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  methods: {
    crop () {
      // base64数据用于直接更新显示，blob数据用于上传到服务器
      this.$refs.cropper.getCropBlob((data) => {
        // do something
        console.log(data)
      })
    }
  }
}
</script>

<style lang='less'>
.demo{
    width: 100%;
    height: 100%;
    position: fixed;
}
</style>
