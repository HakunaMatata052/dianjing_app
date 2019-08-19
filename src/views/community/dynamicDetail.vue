<template>
  <div class="container">
    <navBar />
    <div class="main">
      <dynamicItem />
      <comment ref="comment" :pid="info.videoid" :type="2">
          <template slot="title-right">
              <follow
              :toUserid="$route.params.userid"
              class="btn nofollow"
              v-if="$route.params.userid!=$store.state.userInfo.userid"
            ></follow>
          </template>
      </comment>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navbar.vue";
import dynamicItem from "@/components/dynamic/dynamicItem.vue";
import comment from "@/components/operation/comment.vue";
import follow from "@/components/operation/follow.vue";
export default {
  name: "dynamicDetail",
  data(){
      return {
          info:{}
      }
  },
  components: {
    navBar,
    dynamicItem,
    comment,
    follow
  }
};
</script>

<style lang="less" scoped>
</style>