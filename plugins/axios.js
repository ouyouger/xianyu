
import { Message } from "element-ui";

export default function ({ $axios, redirect }) {
  // 请求失败的时候 会钻到这里！！ 
  $axios.onError(error => {
    // 1 获取失败后的返回值 
    const { statusCode, message } = error.response.data;
    if (statusCode === 400) {
      // 密码错误
      Message.warning(message);
    } else if (statusCode === 401) {
      Message.warning("token过期");
      setTimeout(() => {
        redirect("/user/login/0");
      }, 1000);
    } else if (statusCode === 403) {
      Message.warning("没有token");
      setTimeout(() => {
        redirect("/user/login/0");
      }, 1000);
    }
  })
}