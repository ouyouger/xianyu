<template>
    <div class="order_bill">
    <!-- 机票 -->
    <div class="ticket_price">成人机票:￥{{ticket.base_price}}</div>
    <!-- 燃油 -->
    <div class="oil">机建+燃油:￥{{ticket.airport_tax_audlet}}</div>
    <!-- 总价 -->
    <div class="total_price">应付总价:  {{price}}</div>
  </div>
</template>

<script>
export default {
props:{
    ticket:{
        type:Object,
        default:{}
    },
    price:{
        type:Number,
        default:0
    }
},
mounted(){
    setTimeout(() => {
         console.log(this.ticket);
    }, 2000);
}
}
</script>

<style>

</style>