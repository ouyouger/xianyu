<template>
  <div>
    <!-- 1 乘机人 -->
    <div class="fly_people">
      
      <div class="fly_people_title">乘机人</div>
      
      <div class="fly_people_content">
        <el-form label-position="top" label-width="80px">
          <div class="user_item" v-for="(item,index) in users" :key="index">
            <el-form-item label="乘机人类型">
              <el-row>
                <el-col :span="6">
                  <el-select value="成人" placeholder>
                    <el-option label="成人" value="成人"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="item.username"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
            <div class="decrement" @click="handleDecrement(index)" v-if="index!==0">-</div>
            <el-form-item label="证件类型">
              <el-row>
                <el-col :span="6">
                  <el-select value="身份证" placeholder>
                    <el-option label="身份证" value="身份证"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="18">
                  <el-input v-model="item.id"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </div>
          <el-form-item>
            <el-button @click="handleAddUser" type="primary">添加乘机人</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 1 乘机人 -->
    <!-- 2 保险 -->
    <div class="insurance">
      <div class="insurance_title">保险</div>
      <div class="insurance_content">
        <div class="insurance_row" v-for="(item,index) in ticket.insurances" :key="index">
          <el-checkbox
            label="备选项1"
            border
            @change="handleInsurancesChange(item.id)"
          >{{item.type}}：￥{{item.price}}/份×1最高赔付{{item.compensation}}</el-checkbox>
        </div>
      </div>
    </div>
    <!-- 2 保险 -->
    <!-- 3 联系人 -->
    <div class="contact">
      <div class="contact_title">联系人</div>
      <div class="contact_content">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone">
              <template slot="append">
                <div @click="handleSendCaptcha">发送验证码</div>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSubmit">立即创建</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- 3 联系人 -->
  </div>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // 乘机人
      users: [{ username: "中三", id: "123" }],
      // 保险id
      insurances: [],
      // 联系人名字
      contactName: "李小四",
      // 联系人电话
      contactPhone: "31231232",
      // 验证码
      captcha: "000000",
      // 是否需要发票
      invoice: false,
      // 座位id
      seat_xid: this.$route.query.seat_xid,
      // 航班id
      air: this.$route.query.id
    };
  },
  methods: {
    handleAddUser() {
      this.users.push({ username: "", id: "" });
    },
    //减少乘机人
    handleDecrement(index) {
      this.users.splice(index, 1);
    },
    //保险 复选框 选中事件
    handleInsurancesChange(id) {
      const index = this.insurances.findIndex(v => v === id);
      if (index === -1) {
        //没有添加过
        this.insurances.push(id);
      } else {
        this.insurances.splice(index, 1);
      }
    },
    //发送验证码
    handleSendCaptcha() {
      this.$axios.post("/captchas", { tel: this.contactPhone });
    },
    handleSubmit() {
      let form = {
        //数组
        //users:this.user,
        //数组
        //insurances:this.insurance,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        captcha: this.captcha,
        // bool
        invoice: this.invoice,
        seat_xid: this.seat_xid,
        air: this.air
      };
      //对乘机人做表单验证
      let isUserOk = true;
      this.users.forEach(v => {
        if (v.username === "" || v.id === "") {
          isUserOk = false;
        }
      });
      if (!isUserOk) {
        this.$message.waring("联系人输入不合法");
        return;
      }
      let isOk = true;
      for (const key in form) {
        if (form[key] === "") {
          this.$message.warning("输入不合法");
          isOk = false;
          break;
        }
      }
      if (!isOk) {
        //不要继续向下执行
        return;
      }
      //发送异步请求
      form.users = this.users;
      form.insurances = this.insurances;
      //获取vuex中的token
      const token = this.$store.state.user.userinfo.token;
      this.$axios.post("/airorders", form, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(res => {
          this.$message.success("订单提交成功");
          setTimeout(() => {
            this.$router.push({
              path: "/air/pay",
              query: { id: res.data.data.id }
            });
          }, 1000);
        });
    }
  },
  computed: {
    price() {
      let price = 0;
      //机票费用
      price += this.ticket.base_price;
      //机建+燃油 费用
      price += this.ticket.airport_tax_audlet;
      // 保险 费用   this.insurances =[1,2]
      // 要拿到 1,2 id 去 ticket.insurances 找到 这个id 的价格
      this.insurances.forEach(v => {
        const index = this.ticket.insurances.findIndex(vv => vv.id === v);
        //获取保险对象
        const item = this.ticket.insurances[index];
        price += item.price;
      });
      //乘机人的数量
      price *= this.users.length;
      this.$emit("countPrice", price);
      return price;
    }
  }
};
</script>

<style lang="less" scoped>
.fly_people_title,
.insurance_title,
.contact_title {
  padding: 20px 0;
  font-size: 30px;
}
.insurance_row {
  margin: 10px 0;
}

.user_item {
  position: relative;
  .decrement {
    position: absolute;
    width: 25px;
    height: 25px;
    background-color: #666;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 114px;
    right: 13px;
    border-radius: 50%;
    cursor: pointer;
  }
}
</style>