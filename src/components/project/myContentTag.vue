<template>
  <content-tag :tag-list="tagList" :full-path="fullPath"
           @closeTags="onCloseTags"
           @closeAll="onCloseAll"
           @closeOther="onCloseOther"
  />
</template>

<script>
  import contentTag from "../common/contentTag";
  export default {
    name: "myContentTag",
    components:{contentTag},
    data() {
      return {
        tagList: this.$store.getters.getTagList
      }
    },
    computed:
    {
      fullPath()
      {
        return this.$route.fullPath
      }
    },
    methods:{
      // 关闭单个标签
      onCloseTags(index) {
        let delItem = this.tagList.splice(index, 1)[0];
        let item = this.tagList[index] ?
            this.tagList[index] : this.tagList[index - 1];
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path);
        }else{
          this.$router.push('/');
        }
      },
      // 关闭全部标签
      onCloseAll(){
        this.tagList = this.tagList.filter(item => {
          return item.fixed;
        });
        if (this.tagList.length > 0)
        {
          this.$router.push(this.tagList[0].path);
        }
        else {
          this.$router.push('/');
        }
      },
      // 关闭其他标签
      onCloseOther(){
        this.tagList  = this.tagList.filter(item => {
          return item.path === this.$route.fullPath || item.fixed;
        });
      }
    },
    watch: {
      tagList(newValue, oldValue) {
        this.$store.commit('setAppTagList', newValue)
      }
    }
  }
</script>
