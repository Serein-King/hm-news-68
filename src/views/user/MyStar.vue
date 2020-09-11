<template>
  <div class="mystar">
      <hm-header>我的收藏</hm-header>
      <div class="list">
        <hm-post v-for="item in list" :key="item.id" :post='item'></hm-post>
          <!-- <div class="item" v-for="item in list" :key="item.id">
              <div class="info">
                  <div class="title">{{item.title}}</div>
                  <div class="user">
                      <span class="nickname">{{item.user.nickname}}</span>
                      <span>{{item.comments.length}}跟帖</span>
                  </div>
              </div>
              <div class="img">
                  <img :src=' $url(item.cover[0].url)' alt="">
              </div>
          </div> -->
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getStarList()
  },
  methods: {
    async getStarList () {
      const res = await this.$axios.get('/user_star')
      console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        this.list.forEach(item => { item.comment_length = item.comments.length })
      }
    }
  }
}
</script>

<style lang='less' scoped>
// .item{
//     border-bottom: 1px solid #ccc;
//     padding: 10px;
//     display: flex;
//     .info{
//         flex: 1;
//         font-size: 16px;
//         display: flex;
//         flex-direction: column;
//         justify-content: space-between;
//         .user{
//             color: #666;
//               font-size: 14px;
//               .nickname{
//                   padding-right: 10px;
//               }
//         }
//     }
//     .img{
//         img{
//           width: 120px;
//           height: 74px;
//           //background-size 类似
//           // cover保证图片覆盖完整的大小，有一部分会被截掉
//           // contain  保证图片完整的显示 会有留白
//           object-fit: cover;
//         }
//     }
// }
</style>
