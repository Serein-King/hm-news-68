<template>
  <div id="app">
    <keep-alive include="index">
      <!-- 包裹的组件会被缓存下来，不会销毁 -->
       <router-view></router-view>
    </keep-alive>
  </div>
</template>
<style lang="less">
</style>
