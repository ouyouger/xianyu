<template>
  <div class="register_form">
    <el-form label-position="top" label-width="80px" :rules="rules" :model="form" ref="form">
      <el-form-item prop="username">
        <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="captcha">
        <el-input v-model="form.captcha" placeholder="验证码">
          <!-- template 只是一个占位符 不能 绑定事件！！！！  -->
          <template slot="append">
            <div @click="sendCaptcha">发送验证码</div>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="nickname">
        <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input placeholder="确认密码" v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("俩次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "13800138000",
        captcha: "000000",
        nickname: "13800138000",
        password: "13800138000",
        password2: "13800138000"
      },
      //验证规则
      rules: {
        username: [
          { required: true, message: "请输入手机号码", trigger: "bulr" }
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "bulr" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "bulr" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    sendCaptcha() {
      //1获取 用户的手机号码
       let reg = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;
      if (reg.test(this.form.username)) {
        this.$axios.post("/captchas", { tel: this.form.username }).then(res => {
          console.log(res);
        });
      } else {
        this.$message.warning("手机号码不合法");
      }
    },
    //点击 注册
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let { password2, ...resForm } = this.form;
          console.log(resForm);
          this.$axios
            .post("/accounts/register", resForm)
            .then(res => {
              this.$message.success('注册成功');
              setTimeout(()=>{
                this.$router.push('/user/login/0')
              },1000)
            });
        } else {
          console.log("输入不合法");
          return false;
        }
      });
    }
  }
};
</script>

<style>
.register_form {
  padding: 20px;
}
</style>