<template>
  <my-view-container
          :table-name="tableName" :data="data" :columns="columns"
          @operateClick="onOperateClick">
  </my-view-container>
</template>

<script>
  import MyViewContainer from "../../components/project/myViewContainer";
  export default {
    name: "role",
    components: {MyViewContainer},
    data(){
      return {
        tableName:'角色信息表',
        columns:[],
        data:[],
      }
    },
    methods:{
      onOperateClick(command,value){
        console.log(command);
        console.log(value);
      }
    },
    created() {
      for(let i = 1;i <= 50;i++) {
        this.data.push({
          id: i,
          date: '2016-05-03',
          sex: '男',
          age: 20,
          name: '王小虎',
          address: '上海陆家嘴'
        });
      }
      this.columns = [{
        type:'selection',
        prop:"id",
        label:"id",
        isShow:true,
        showOverflowTooltip:true
      },{
        type:'date',
        prop:"date",
        label:"日期",
        isShow:true,
        showOverflowTooltip:true,
        sortable:true
      }, {
        type:'',
        prop:"name",
        label:"姓名",
        isShow:true,
        showOverflowTooltip:true,
        sortable:true

      }, {
        type:'',
        prop:"address",
        label:"地址",
        isShow:true,
        showOverflowTooltip   :true,
        sortable:true
      }, {
        type:'',
        prop:"age",
        label:"年龄",
        isShow:true,
        showOverflowTooltip:true,
        sortable:true
      }, {
        type:'',
        prop:"sex",
        label:"性别",
        isShow:true,
        showOverflowTooltip:true,
        sortable:false
      }, {
        type:'operate',
        label:"操作",
        width:115,
        isShow:true,
        showOverflowTooltip:true,
        details:[{
          label:"编辑",
          icon:"el-icon-edit",
          command:"edit",
          type:"warning",
        },{
          label:"删除",
          icon:"el-icon-delete",
          command:"delete",
          type:"danger",
        }]
      }];
    }
  }
</script>

<style lang="scss" scoped>
  .my-view-content-search{
    span,p{
      margin: 5px;
    }
  }
</style>