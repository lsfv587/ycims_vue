<template>
  <view-container>
    <!--搜索栏-->
    <slot v-if="isShowSearch" name="my-search" slot="search"></slot>
    <!--操作栏-->
    <operate-bar slot="operate">
      <!--操作栏 左侧-->
      <slot name="my-operate-left" slot="left">
        <el-button-group >
          <el-button v-for="op of operateLefts"
                  size="mini" :type="op.type" :icon="op.icon"
                  @click="OnOperateClick(op.command)">{{op.label}}</el-button>
        </el-button-group>
      </slot>
      <!--操作栏 右侧-->
      <slot name="my-operate-right" slot="right">
        <el-button-group >
          <el-tooltip v-if="operateRights.indexOf('search') != -1"
                      effect="light" :content="isShowSearch ? '隐藏搜索栏' : '显示搜索栏'" placement="bottom-start">
            <el-button size="mini"  icon="el-icon-search" @click="() => this.isShowSearch = !this.isShowSearch"></el-button>
          </el-tooltip>
          <el-tooltip v-if="operateRights.indexOf('refresh') != -1"
                  effect="light" content="刷新" placement="bottom-start">
            <el-button size="mini"  icon="el-icon-refresh-right" @click="this.reload"></el-button>
          </el-tooltip>
          <el-tooltip v-if="operateRights.indexOf('changeShow') != -1"
                  effect="light" content="切换显示" placement="bottom-start">
            <el-button size="mini"  icon="el-icon-s-operation" @click="() => this.isShowTable = !this.isShowTable"></el-button>
          </el-tooltip>
          <el-popover v-if="operateRights.indexOf('containCol') != -1"
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
          <el-popover v-if="operateRights.indexOf('export') != -1"
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
      </slot>
    </operate-bar>
    <!--内容显示栏-->
    <slot name="my-content">
        <my-normal-table class="content-table"  slot="content"
            :is-show-table="isShowTable"
            :columns="getColumns" :table-data="data" :total="data.length"
            @operateClick="OnOperateClick"
            @multipleClick="onMultipleClick"
        />
    </slot>
    <!--分页-->
    <slot name="my-content-pagination" slot="content-pagination">
      <el-pagination v-if="isShowTable"
                     class="table-pagination"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-sizes="[10,20,30,40,50]"
                     :page-size="perSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
      <el-pagination v-else
                     small
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :page-size="perSize"
                     layout="prev, pager, next"
                     :total="total">
      </el-pagination>
    </slot>

  </view-container>
</template>

<script>
  import ViewContainer from "../../components/common/viewContainer";
  import MyNormalTable from "../../components/project/myNormalTable";
  import OperateBar from "../../components/common/operateBar";
  import exportToExcel from '@/tool/generateExcel';
  export default {
    name: "myViewContainer",
    components: {OperateBar, MyNormalTable, ViewContainer},
    props:{
      tableName:{
        type:String,
        default:"table_data"
      },
      total:0,
      data:{
        type:Array,
        default:() => []
      },
      columns:{
        type:Array,
        default:() => []
      },
      operateRights:{
        type:Array,
        default:() =>['search','refresh','containCol','changeShow','export']
      },
      operateLefts:{
        type:Array,
        default:() =>[{
          label:"添加",
          icon:"el-icon-circle-plus",
          command:"add",
          type:"success",
        },{
          label:"删除",
          icon:"el-icon-delete",
          command:"deleteSelected",
          type:"danger",
        }]
      }
    },
    data(){ 
      return {
        isShowSearch:true,
        isShowTable:true,
        fileType:'xlsx',
        checkList:[],
        perSize:10
      }
    },
    inject:['reload'],
    computed:{
      getColumns()
      {
        return this.columns.filter(c => c.isShow)
      }
    },
    methods:{
      //设置页大小
      handleSizeChange(val) {
        this.perSize = val;
        this.handleCurrentChange(1);
      },
      //触发页面变化事件
      handleCurrentChange(val) {
        this.$emit("pageChange",{index:val,size:this.perSize})
      },
      OnOperateClick(command,param){
        if (param == undefined){
          this.$emit("operateClick",command,this.checkList)
        }
        else{
          this.$emit("operateClick",command,param)
        }
      },
      onMultipleClick(value){
        this.checkList = value
      },
      //导出数据
      exportData(){
        exportToExcel({
          columns:this.columns.filter(c => c.type !== 'operate'),
          data:this.data,
          fileType:this.fileType,
          fileName:this.tableName,
          autoWidth:true,
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .table-pagination{
    margin: 3px 0;
  }
  .content-table{
    margin: 0 10px 10px 10px;
  }
</style>