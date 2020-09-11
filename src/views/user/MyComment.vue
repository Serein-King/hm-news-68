<template>
  <div class="my-comment">
       <hm-header>我的评论</hm-header>
       <div class="list" >
         <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
         <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check='false'
          >
           <div class="item" v-for="item in commentList" :key="item.id">
               <div class="time">{{item.create_time | time('YYYY-MM-DD HH:mm')}}</div>
               <div class="comment" v-if="item.parent">
                   <div class="name">回复：{{item.parent.user.nickname}}</div>
                   <div class="comment_content">{{item.parent.content}}</div>
               </div>
               <div class="content">{{item.content}}</div>
               <div class="origin">
                   <span class="one-txt-cut" @click="$router.push(`/postdetail/${item.post.id}`)">原文：{{item.post.title}}</span>
                   <span class="iconfont iconjiantou1"></span>
               </div>
           </div>
          </van-list>
        </van-pull-refresh>
       </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      commentList: [],
      // 当前页
      pageIndex: 1,
      // 显示条数
      pageSize: 5,
      // loading 为true代表组件正在加载数据，onload就不会重复触发
      // 当滚动到底部时 触发onload事件，自动把loading改成fasle
      loading: false,
      // 代表是否 结束 fsalse代表还是数据，finshed代表没有更多数据
      finished: false,
      // 代表是否正在下拉刷新
      refreshing: false
    }
  },
  created () {
    this.getCommentList()
  },
  methods: {
    async getCommentList () {
      const res = await this.$axios.get('/user_comments', {
        // get请求的参数必须放到params中 或者拼接到url地址中
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      console.log(res.data)
      if (statusCode === 200) {
        this.commentList = [...this.commentList, ...data]
        console.log(this.commentList)
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (data.length < this.pageSize) {
          this.finished = true
        }
        // 结束下拉刷新
        this.refreshing = false
      }
    },
    onLoad () {
      // 滑到底部加载下一页数据

      setTimeout(() => {
        this.pageIndex++
        this.getCommentList()
      }, 1500)
      // setTimeout(() => {
      //   // for (let i = 0; i < 10; i++) {
      //   //   this.list.push(this.list.length + 1)
      //   // }

      //   // // 加载状态结束
      //   // this.loading = false

      //   // // 数据全部加载完成
      //   // if (this.list.length >= 40) {
      //   //   this.finished = true
      //   // }
      // }, 2000)
    },
    onRefresh () {
      console.log('下拉')
      setTimeout(() => {
        this.pageIndex = 1
        this.loading = true
        this.finished = false
        this.commentList = []
        this.getCommentList()
      }, 1500)
      // 清空列表数据
      // this.finished = false

      // // 重新加载数据
      // // 将 loading 设置为 true，表示处于加载状态
      // this.loading = true
      // this.onLoad()
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px 20px;
  .time {
    color: #666;
    padding: 10px 0;
  }
  .comment {
    background-color: #ddd;
    padding: 10px;
    .name {
      color: #666;
      font-size: 14px;
    }
    .comment_content {
      color: #999;
      line-height: 30px;
      margin-top: 10px;
    }
  }
  .content {
    margin: 10px 0;
  }
  .origin {
    font-size: 14px;
    color: #999;
    display: flex;
    justify-content: space-between;
  }
}
</style>
