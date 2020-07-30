<template>
  <view-container>
    <!--搜索栏-->
    <div v-if="isShowSearch" class="_search" slot="search">
      <span>
        <label>用户名：</label><el-input type="text" style="width: 150px;line-height: 15px"></el-input>
      </span>
      <span>
        <label>登入状态：</label><el-input type="text" style="width: 150px"></el-input>
      </span>
      <p>
        <label>创建时间：</label>
        <el-date-picker type="date" placeholder="开始日期"  ></el-date-picker><span> - </span>
        <el-date-picker type="date" placeholder="结束日期" ></el-date-picker>
        <span>
          <el-button-group>
            <el-button size="mini" type="primary" icon="el-icon-search">查询</el-button>
            <el-button size="mini" type="primary" icon="el-icon-refresh">重置</el-button>
          </el-button-group>
        </span>
      </p>
    </div>
    <!--操作栏-->
    <operate-bar slot="operate">
      <el-button-group slot="left">
        <el-button size="mini" type="success" icon="el-icon-circle-plus"
                   @click="">添加</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete"
                   @click="">删除</el-button>
      </el-button-group>
      <el-button-group slot="right">
        <el-tooltip effect="light" :content="isShowSearch ? '隐藏搜索栏' : '显示搜索栏'" placement="bottom-start">
          <el-button size="mini"  icon="el-icon-search" @click="() => this.isShowSearch = !this.isShowSearch"></el-button>
        </el-tooltip>
        <el-tooltip effect="light" content="刷新" placement="bottom-start">
          <el-button size="mini"  icon="el-icon-refresh-right"></el-button>
        </el-tooltip>
        <el-popover
                placement="bottom"
                title="显示列"
                trigger="hover">
          <ul style="list-style: none">
            <li v-for="c of columns">
              <el-checkbox :label="c.label" v-model="c.isShow" :checked="c.isShow"></el-checkbox>
            </li>
          </ul>
          <el-button slot="reference" size="mini"  icon="el-icon-s-grid">
          </el-button>
        </el-popover>
        <el-popover
                placement="bottom"
                title="数据格式"
                trigger="hover">
          <ul style="list-style: none">
            <el-radio-group v-model="fileType">
              <li>
                <el-radio label="xlsx" >xlsx</el-radio>
              </li>
              <li>
                <el-radio label="csv">csv</el-radio>
              </li>
              <li>
                <el-radio label="txt">txt</el-radio>
              </li>
            </el-radio-group>
          </ul>
            <el-button slot="reference" @click="exportData" size="mini"  icon="el-icon-download"></el-button>
        </el-popover>
      </el-button-group>
    </operate-bar>
    <!--内容显示栏-->
    <my-normal-table slot="content" :columns="getColumns" :table-data="data" :total="data.length">
      <el-table-column slot="column-operate" label="操作" width="110">
        <template slot-scope="scope">
          <el-button-group>
            <el-button size="mini" type="warning" icon="el-icon-edit"
                       @click="handleEdit(scope.$index, scope.row)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete"
                       @click="handleDelete(scope.$index, scope.row)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </my-normal-table>
  </view-container>
</template>

<script>
  import ViewContainer from "../../components/common/viewContainer";
  import MyNormalTable from "../../components/project/myNormalTable";
  import OperateBar from "../../components/common/operateBar";
  export default {
    name: "menus",
    components: {OperateBar, MyNormalTable, ViewContainer},
    data(){
      return {
        isShowSearch:true,
        columns:[],
        data:[],
        fileType:'xlsx'
      }
    },
    computed:{
      getColumns()
      {
        return this.columns.filter(c => c.isShow)
      },
    },
    methods:{
      handleEdit(index,row){
        this.$emit("editClick",index,row)
      },
      handleDelete(index,row){
        this.$emit("deleteClick",index,row)
      },
      exportData(){

      }
    },
    created() {
      for(let i = 1;i <= 100;i++) {
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
        showOverflowTooltip:true,
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
      }];
    }
  }
</script>

<style lang="scss" scoped>
  ._search {
    padding: 5px 0 5px 10px;
    font-size: small;
    span,p{
      margin: 5px;
    }
  }
</style>