<template>
  <left-side-nav class="side-nav"
          :items="getMenus"
          :default-active="onRoutes"
          :is-collapsed="isCollapsed"
  />
</template>

<script>
  import leftSideNav from "../common/leftSideNav";
  export default {
    name: "myLeftSideNav",
    components:{leftSideNav},
    computed:{
      onRoutes(){
        return this.$route.fullPath;
      },
      isCollapsed()
      {
        return this.$store.getters.getCollapsed
      },
      getMenus(){
        return this.$store.getters.getUser.menus;
      }
    },
    methods:{
    }
  }
</script>

<style lang="scss" scoped>
  .side-nav{
    display: block;
    position: absolute;
    left: 0;
    top: 50px;
    bottom:0;
    overflow-y: scroll;
    .el-menu-item{
      line-height: 30px;
      height: 30px;
    }
  }
  .side-nav::-webkit-scrollbar{
    width: 0;
  }
</style>