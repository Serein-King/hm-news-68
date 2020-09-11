<template>
  <div class="index">
    <div class="header">
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search">
        <div class="search-box" @click="$router.push('/search')">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>

    <!-- tab栏效果 -->
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/manage')">
       <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable >
      <!-- <template #nav-left>左侧</template> -->
      <van-tab :title="tab.name" v-for="tab in tabList" :key="tab.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
         <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check='false'
          >
            <hm-post :post="item" v-for="item in newsList" :key="item.id"></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  // 组建的name   1.递归的时候渲染自己=======2.缓存的时候通过name 进行缓存
  name: 'index',
  data () {
    return {
      active: 0,
      // 用于存放栏目列表数据
      tabList: [],
      newsList: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      // 代表是否 结束 fsalse代表还是数据，finshed代表没有更多数据
      finished: false,
      refreshing: false
    }
  },
  created () {
    this.getTabList()
  },
  methods: {

    async getTabList () {
      // 先从缓存里边拿取，
      const activeList = JSON.parse(localStorage.getItem('activeList'))

      if (activeList) {
        this.tabList = activeList
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // 发送请求获取第一个tab栏的数据
        this.getNewsList(this.tabList[0].id)
      }
    },
    // 获取新闻列表
    async getNewsList (id) {
      // 发送请求获取新闻数据
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.pageIndex === 1) {
          this.newsList = []
        // console.log('NESLIST', this.newsList)
        }
        this.newsList = [...this.newsList, ...data]
        console.log(this.newsList)
        // 数据加载完成 把loading 改成 fasle
        this.loading = false
      }
      // 数据全部加载完成
      if (data.length < this.pageSize) {
        this.finished = true
      }
      // 结束下拉刷新
      this.refreshing = false
    },
    onLoad () {
      setTimeout(() => {
        // 加载下一页数据
        this.pageIndex++
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh () {
      // console.log('下拉')
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      this.newsList = []
      setTimeout(() => {
        this.getNewsList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active (value) {
      // console.log(value)
      // 重新加载当前分类下的数据
      // 1.清空文章的数组
      this.newsList = []
      // 可能下拉产生页码值，也要清掉
      this.pageIndex = 1
      // 可能已经加载完成
      this.finished = false
      this.loading = true
      // 重新获取文章
      this.getNewsList(this.tabList[value].id)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  background-color: #ff0000;
  line-height: 50px;
  text-align: center;
  color: #fff;
  .logo,
  .user {
    width: 70px;
  }
  .logo {
    span {
      font-size: 50px;
    }
  }
  .user {
    span {
      font-size: 24px;
    }
  }
  .search {
    flex: 1;
    .search-box {
      height: 34px;
      line-height: 34px;
      background-color: rgba(255, 255, 255, .5);
      margin-top: 8px;
      border-radius: 17px;
      font-size: 14px;
      span:first-child {
        margin-right: 5px;
      }
    }
  }
}
/deep/ .van-tabs__wrap{
  width: 85%;
}
.more{
  width:15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 1000;
  background-color: #fff;
  text-align: center;
  line-height: 42px;
}
.more-sticky{
 /deep/ .van-sticky--fixed{
   z-index: 10000;
 }
}
</style>
