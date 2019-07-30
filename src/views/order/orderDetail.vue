<template>
  <div class="container" id="orderDet">
    <navBar />
    <div class="main">
      <orderItem :list="list" />
    </div>
  </div>
</template>
<script>
import navBar from "@/components/navbar/navbar.vue";
import orderItem from "@/components/order/orderItem.vue";
export default {
  name: "orderDetail",
  components: {
    navBar,
    orderItem
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    var that = this;
    that.$SERVER
      .orderDetails({
        orderid: that.$route.params.id
      })
      .then(res => {
        that.list.push(res.data)
      });
  }
};
</script>
<style lang="less" scoped>
</style>
