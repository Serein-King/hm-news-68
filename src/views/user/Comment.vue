<template>
  <div class="comment">

      <comment :data='data.parent'  v-if="data.parent"></comment>
       <div>我是评论组件</div>
         <p>{{data.content}}</p>
       <!-- <comment :count='count-1' v-if="count > 0"> </comment> -->
  </div>
</template>

<script>
export default {
  name: 'comment',
  props: {
    // count: Number,
    data: Object
  }
}
</script>

<style lang='less' scoped>
 .comment{
     border: 1px solid #000;
     padding: 5px;
 }
</style>
