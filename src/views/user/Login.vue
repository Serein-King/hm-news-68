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
      :rules='rules.username'
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules='rules.password'
     />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">
      登录
      </van-button>
    </div>
     <p class="tips">没有账号？<router-link to="/register">去注册</router-link></p>
     </van-form>
  </div>
</template>

<script>
export default {
  created () {
    // console.log(this.$route.query)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async login () {
      const res = await this.$axios.post('login', {
        username: this.username,
        password: this.password
      })
      // console.log(res.data)
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        // 保存token
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        // 跳转页面
        if (this.$route.query.back) {
          this.$router.back()
        } else {
          this.$router.push('/user')
        }
        // this.$router.push({
        //   path: '/user'
        // })
      } else {
        this.$toast.fail(message)
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

<style lang='less' scoped>
.tips{
  font-size: 16px;
  text-align: right;
  padding: 15px;
  a{
    color:orange
  }
}

</style>
