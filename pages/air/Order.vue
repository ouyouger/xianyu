<template>
    <div class="order">
    <div class="order_main">
      <OrderForm @countPrice='countPrice' :ticket="ticket" />
    </div>
    <div class="order_aside">
      <OrderBill :price="price"  :ticket="ticket"/>
    </div>
  </div>
</template>

<script>
import OrderForm from "@/components/air/OrderForm";
import OrderBill from "@/components/air/OrderBill";
export default {
 data(){
     return{
         ticket:{},
         price:0
     }
 },
 components:{
     OrderForm,OrderBill
 },
 mounted(){
     this.$axios.get('/airs/'+this.$route.query.id,{
         params:{
             seat_xid:this.$route.query.seat_xid
         }
     })
     .then(res=>{
         this.ticket=res.data
     })
 },
 methods:{
   countPrice(price){
     this.price=price
   }
 }
}
</script>

<style>
.order {
  width: 1000px;
  margin: 0 auto;
  display: flex;
}
.order_main {
  flex: 2;
}
.order_aside {
  flex: 1;
}
</style>