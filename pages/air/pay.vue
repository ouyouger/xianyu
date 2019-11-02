<template>
  <div class="pay">
    <div class="pay_view">
      <div class="pay_moneny">
        总金额：<span>￥1395</span>
      </div>
      <div class="pay_wechat">
        <div class="pay_title">
        微信支付
        </div>
        <div class="pay_mian">
   <div class="erweima">
         <canvas id="canvas"></canvas>
         <!-- 支付的图片 -->
               <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
        </div>
        <div class="img">
          <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt srcset />
        </div>
        </div>
     
      </div>
    </div>
  </div>
</template>

<script>
const QRcode=require('qrcode')
export default {
    data(){
        return{
            order:{}
        };
    },
    mounted(){
        //1获取 订单的数据 价格 和支付的图片
        const token=this.$store.state.user.userinfo.token;
        //2 使用get请求
        this.$axios.get('/airorders/'+this.$route.query.id,{
            headers:{Authorization:`Bearer ${token}`}
        })
        .then(res=>{
            this.order=res.data;
            
            //3把支付链接 画出来
            const canvas=document.getElementById('canvas')
            QRcode.toCanvas(canvas,res.data.payInfo.code_url,function(err){
                if(err) console.error(error);
                console.log('success!')
            });
            //3 开启定时器 用来检测用户支付成功 私人的
            // let timeId=setInterval(() => {
            //    this.$axios.post('/airorders/checkpay',{
            //        id:this.$route.query.id,
            //        nonce_str: res.data.payInfo.nonce_str,
            //         out_trade_no: res.data.payInfo.order_no},
            //         {headers:{Authorization:`Bearer ${token}`}}
            //    ) 
            //    .then(result=>{
            //        if(result.data.trade_state==='SUCCESS'){
            //            clearInterval(timeId)
            //            this.$message.success('支付成功')
            //        }
            //    })
            // }, 3000);
        })
    }
};
</script>

<style lang='less' scoped>
.pay {
  height: 690px;
  background-color: #f5f5f5;
}
  .pay_view {
      width: 1000px;
      margin: 0 auto;
  }
  .pay_moneny{
      padding: 20px 0;
      font-size: 25px;
      text-align: right;
      span{
          font-size: 28px;
          color: red;
      }
  }
.pay_wechat{
  background-color: #fff;
    height: 580px;
    border-top: 4px  solid orange;
    .pay_title{
        padding: 20px;
        font-size: 35px;
    }
    .pay_mian{
        display: flex;
        justify-content: space-between;
        align-items:center;
        padding: 0 111px;
        .erweima{
            border:1px solid #ccc;
            width: 228px;
            height: 310px;
            padding: 10px;
            text-align: center;
        }
    }
}
</style>