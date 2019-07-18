<template>
  <div class="gander">
    <van-icon class-prefix="icon" :name="gander===1 ? 'man' : 'woman' " />{{age}}
  </div>
</template>

<script>
export default {
  props: {
    gander: {
      type: Number,
      default() {
        return 0;
      },
      required: true
    },
    age: {
      type: Number,
      default() {
        return 0;
      },
      required: true
    },
  }
};
</script>
<style lang="less" scoped>
.gander {
  display: inline-block;
  font-size: 9px;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-left: 5px;
  background: rgba(255, 217, 72, 1);
  border-radius: 20px;
  padding: 2px 5px;
  .icon {
    font-size: 9px;
  }
}
</style>
