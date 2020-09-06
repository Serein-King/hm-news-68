<template>
  <div class="post-detail">
      <div class="header">
        <div class="left" @click="$router.back()">
          <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="center">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="right">
          <div class="followed" v-if="post.has_follow" @click='unfollow'>已关注</div>
          <div class="follow" v-else @click='follow'>关注</div>
        </div>
      </div>
     <div class="content">
         <div class="title">{{post.title}}</div>
         <div class="name">
             <span>{{post.user.nickname}}</span>
             <span>{{post.create_date | time}}</span>
         </div>
         <div v-if="post.type === 1" class="info" v-html="post.content">
         </div>
         <video :src="getUrl(post.content)" v-else controls  autoplay muted ></video>
         <div class="buttons" >
             <div class="good" :class="{active:post.has_like}" @click='like'>
                 <span class="iconfont icondianzan"></span>
                 <span >{{post.like_length || 0}}</span>
             </div>
             <div class="share">
                 <span class="iconfont iconweixin"></span>
                 <span>微信</span>
             </div>
         </div>
     </div>
     <!-- 评论 -->
    <div class="comment-list">
      <h3>精彩跟贴</h3>
      <hm-comment  :comment="comment" v-for="comment in commentList" :key="comment.id"></hm-comment>
    </div>
     <div class="footer">
       <div class="search">
         <input type="text" placeholder="回复">
       </div>
       <span class="iconfont iconpinglun-"><i>200</i></span>
       <span class="iconfont iconshoucang" :class="{now:post.has_star}" @click='star'></span>
       <span class="iconfont iconfenxiang"></span>
     </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      },
      commentList: []
    }
  },
  created () {
    this.getInfo()
    // 获取文章的评论列表
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        console.log(this.commentList)
      }
    },
    async star () {
      if (this.noLogin()) return
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    noLogin () {
      const token = localStorage.getItem('token')
      // 没有登录
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        return true
      } else {
        return false
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async getInfo () {
      // x需要id
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      //   console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        console.log(this.post)
      }
    },
    async follow () {
      // 判断是否登录
      if (this.noLogin()) return
      // 已经登录
      // console.log('发送请求登录')
      // const id = localStorage
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('关注成功')
        this.getInfo()
      }
    },
    async unfollow () {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success('取消关注成功')
        this.getInfo()
      }
    },
    async  like () {
      // 说明登录了
      if (this.noLogin()) return
      console.log('发送请求登录')
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    // 判断是否登录
    // 没有登陆先要跳转
    // 已经登录 发送请求 渲染
    }
  }
}
</script>

<style lang="less" scoped>
.post-detail{
  padding-bottom: 50px;
}
 .header {
     display: flex;
     padding: 0 10px;
     border: 1px solid #ccc;
     height: 50px;
     align-items: center;
     .left{
         span{
             line-height: 50px;
         }
     }
     .center {
         flex: 1;
         span{
             font-size: 50px;
         }
     }
     .right{
         font-size: 14px;
         .follow,
         .followed{
             border: 1px solid #ccc;
             width: 60px;
             height: 30px;
             text-align: center;
             line-height: 30px;
             border-radius: 15px;
         }
         .follow{
             background-color: #ff0000;
             color: #fff;
         }
     }
 }
 .content{
     padding: 10px;
     border-bottom: 3px solid #ccc;
     .title{
         font-weight: 700;
         font-size: 16px;
     }
     .name{
         font-size: 14px;
         color:#666;
         margin: 10px 0;
         span:first-child{
            margin-right: 20px;
         }
     }
    .info{
        font-size: 14px;
         /deep/ img{
         width: 100%;
     }
    }
    video{
        width: 100%;
    }
    .buttons{
        display: flex;
        justify-content: space-around;
        > div{
            height: 40px;
            width: 120px;
            line-height: 40px;
            border-radius: 20px;
            border: 1px solid #ccc;
            text-align: center;
            font-size: 18px;
            .iconfont{
                font-size: 18px;
                margin-right: 5px;
            }
            .iconweixin{
                color: greenyellow;
            }
        }
        .active{
          border-color: red;
          color: red;
        }
    }
 }
 .comment-list{
   h3{
     text-align: center;
     padding: 10px 0;
   }
 }
 .footer{
   background-color: #fff;
   width: 100%;
   height: 50px;
   display: flex;
   border-top: 1px solid #ccc;
   position: fixed;
   bottom: 0;
   align-items: center;
   justify-content: space-around;
   padding: 0 10px;
   .iconfont{
     font-size: 24px;
   }
   .now{
     color: red;
   }
   .iconpinglun- {
     position: relative;
     i{
       position: absolute;
       right: 0;
       top: 0;
       background-color: red;
       font-size: 10px;
       color: #fff;
       padding: 0 3px;
       right: -5px;
       border-radius: 5px;
       font-style: normal;
     }
   }
   .search{
     width: 180px;
     padding-right: 10px;
     input{
       height: 30px;
       background-color: #ddd;
       border-radius: 15px;
       width: 100%;
       border: none;
       font-size: 14px;
       padding-left: 20px;
     }
   }
 }
</style>
