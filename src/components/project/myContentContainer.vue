<template>
  <content-container class="content-box" :class="{'content-collapse':isCollapsed}" >
    <bread-crumb v-if="isShowBreadcrumb" class="breadcrumb-bar" slot="breadcrumb" :items="getBreadcrumbItems"/>
    <my-content-tag v-if="isShowContentTag" class="content-tag" slot="tag" />
    <div slot="content">
      <transition name="move" mode="out-in">
        <keep-alive :include="tagList">
          <router-view v-if="isRouterAlive"></router-view>
        </keep-alive>
      </transition>
    </div>
  </content-container>
</template>

<script>
  import myContentTag from "./myContentTag";
  import contentContainer from "../common/contentContainer";
  import BreadCrumb from "../common/breadCrumb";
  export default {
    name: "myContentContainer",
    components: {BreadCrumb, contentContainer, myContentTag},
    provide(){
      return {
        reload:this.reload
      }
    },
    data(){
      return {
        isRouterAlive:true
      }
    },
    computed:{
      isShowBreadcrumb()
      {
        return this.$store.state.app.isShowBreadcrumb
      },
      isShowContentTag()
      {
        return this.$store.state.app.isShowContentTag
      },
      isCollapsed()
      {
        return this.$store.getters.getCollapsed
      },
      getBreadcrumbItems()
      {
        return this.$store.getters.getBreadcrumbItems
      },
      tagList()
      {
        return this.$store.getters.getTagList
      }
    },
    methods:{
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(() =>{
          this.isRouterAlive = true
        })
      },
      onCollapseClick(){
        this.$store.commit('leftMenuCollapsed') ;
      },
      // 设置标签
      setTags(route){
        let isExist = this.tagList.some(item => {
          return item.path === route.fullPath;
        })
        if(!isExist){
          if(this.tagList.length >= 8){
            this.tagList.filter(item => {
              return !item.fixed}).shift();
          }
          this.tagList.push({
            title: route.meta.title,
            path: route.fullPath,
            fixed: route.meta.fixed
          })
          this.$store.commit('setAppTagList',this.tagList)
        }
      },
      //设置面包屑内容
      setBreadcrumb(route)
      {
        let items = [];
        if (route.matched && route.matched.length > 0)
        {
          if (route.meta.breadTitle){
            let breadItems = route.meta.breadTitle.split(',')
                .filter(item => item !== '');
            for(let i of breadItems){
              items.push(i);
            }
          }
        }
        this.$store.commit("setAppBreadcrumb",items)
      }
    },
    watch:{
      $route(newValue, oldValue){
        this.setTags(newValue);
        this.setBreadcrumb(newValue)
      }
    },
    created() {
      this.setTags(this.$route)
      this.setBreadcrumb(this.$route)
    }
  }
</script>

<style scoped>
  .content-box {
    position: absolute;
    left: 216px;
    right: 0;
    top: 50px;
    bottom: 0;
    padding-bottom: 30px;
    -webkit-transition: left .3s ease-in-out;
    transition: left .3s ease-in-out;
    overflow: auto;
    /*background: #f0f0f0;*/
  }
  .content-collapse {
    left: 65px;
  }
  .content-tag{
    margin-left: 3px;
  }
  .breadcrumb-bar{
    padding: 5px 10px;
    box-shadow: #666 0px 0px 2px;
  }
</style>