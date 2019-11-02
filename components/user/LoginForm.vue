<template>
  <div class="login_form">
    <el-form label-position="top" label-width="80px" :model="form" ref="form">
      <el-form-item>
        <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input placeholder="密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="submitLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "13800138000",
        password: "13800138000"
      }
    };
  },
  methods:{
    submitLogin(){
      this.$store.dispatch('user/setUser',this.form).then(res=>{
        this.$message.success('登录成功')
        setTimeout(()=>{
          this.$router.push('/')
        },1000)
      })
    }
  }
};
</script>

<style>
.login_form {
  padding: 20px;
}
</style>