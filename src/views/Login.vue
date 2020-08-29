<template>
  <div>
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <!-- 登陆表单 -->
    <van-form @submit="login">
    <van-field
      v-model="username"
      name="用户名"
      label="用户名"
      placeholder="用户名"
      :rules=rules.username
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules=rules.password
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
        提交
      </van-button>
    </div>
</van-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    async login () {
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res.data)
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message)
      } else {
        this.$toast.fail(res.data.message)
      }
    }
  },
  data () {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位数字', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度是5-9位数字', trigger: 'onChange' }
        ]
      }
    }
  }
}
</script>

<style lang='less'>

</style>
