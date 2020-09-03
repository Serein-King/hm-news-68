<template>
<div class="user">
    <div class="header" @click="$router.push('/edit')">
        <div class="avatar">
            <img :src="$axios.defaults.baseURL + user.head_img" alt="">
        </div>
        <div class="info">
            <div class="name">
                <span v-if="user.gender===1" class="iconfont iconxingbienan"></span>
                <span v-else class="iconfont iconxingbienv"></span>
                <span>{{user.nickname}}</span>
            </div>
            <div class="time">
               {{user.create_date | time}}
            </div>
        </div>
        <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
        </div>
    </div>
      <!-- 导航条 -->
        <hm-navitem to='/myfollow'>
            <template>我的关注</template>
            <template #content>关注的内容</template>
        </hm-navitem>
        <hm-navitem to='/mycomment'>
            <template>我的跟帖</template>
            <template #content>跟帖/回复</template>
        </hm-navitem>
        <hm-navitem to='/mystar'>
            <template>我的收藏</template>
            <template #content>文章/视频</template>
        </hm-navitem>
        <hm-navitem to='/edit'>
            <template>设置</template>
            <!-- <template #content></template> -->
        </hm-navitem>
        <div style='margin:15px'><van-button type="primary" block @click='logout'>退出</van-button></div>
</div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  async created () {
    // token 必须放在请求头中 ， 请求头中有 authorization
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    // get (url,config(设置一些配置))
    const res = await this.$axios.get(`/user/${userId}`, {
      headers: {
        Authorization: token
      }
    })
    const { data, statusCode } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async logout () {
    //   console.log(123)
    // 跳出提示框
    //   async await 等到失败的结果 要用 try catch的 语法
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出吗？'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$router.push('/login')
        this.$toast('退出成功')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>
<style lang='less' scoped>
.user{
    .header{
        display: flex;
        padding: 20px 10px;
        border-bottom: 3px solid #ccc;
        align-items: center;
        .avatar {
          width: 70px;
          height: 70px;
            img{
            border-radius: 50%;
            width: 100%;
            height: 100%
            }
        }
        .info {
            flex: 1;
            padding-left: 20px;
            font-size: 14px;
             .time{
                 margin-top: 10px;
                 color: #666;
             }
             .iconxingbienan {
                 color: skyblue;
             }
              .iconxingbienv {
                 color:pink;
             }
        }
    }
}
</style>
