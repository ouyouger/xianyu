<template>
  <div class="login">
<div class="login_main">
<div class="login_main_title">
<div
 class="title_item"
 :class="currentIndex===index?'active':''"
 @click="currentIndex=index"
 v-for="(item,index) in ['登录','注册']"
 :key="index"
>
{{item}}
</div>
</div>
<div class="login_main_content">
<!-- 登录组件 -->
<div v-if="currentIndex===0"><LoginForm/></div>
<!-- 注册组件 -->
<div v-else><RegisterForm/></div>
</div>

</div>
  </div>
</template>

<script>
import LoginForm from "@/components/user/LoginForm";
import RegisterForm from "@/components/user/RegisterForm";
export default {
data(){
  return{
    currentIndex:1
  }
},
components:{
  LoginForm,RegisterForm
}
}
</script>

<style  lang="less" scoped>
.login {
  height: 700px;
  min-width: 1000px;
  background: url(http://127.1:1337/assets/images/th03.jfif) center center;
  position: relative;
  .login_main {
    position: absolute;
    background-color: #fff;
    width: 400px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .login_main_title {
      height: 50px;
      color: #666;
      background-color: #eeeeee;
      display: flex;
      .title_item {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .active {
        color: orange;
        position: relative;
        background-color: #fff;
        font-weight: 600;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: orange;
        }
      }
    }
  }
}
</style>