<template>
  <div class="demo">
     <Comment :count='5'> </Comment>
  </div>
</template>

<script>
import Comment from './Comment.vue'
export default {
  components: {
    Comment
  }
}
</script>

<style>

</style>
