<template>
  <div>
    <!--内容 表格显示-->
    <el-table v-if="isShowTable"
              class="table-box"
              ref="multipleTable"
              fit
              border
              stripe
              highlight-current-row
              :max-height="maxHeight"
              :data="tableData"
              tooltip-effect="dark"
              @selection-change="handleSelectionChange">
      <!--表头列-->
      <slot name="table-columns">
        <template v-for="c of columns">
          <!--id-->
          <el-table-column  v-if="c.type === 'selection'"
                           type="selection" :prop="c.prop"
                           width="40" >
          </el-table-column>
          <!--日期-->
          <el-table-column v-else-if="c.type === 'date'"
                           :prop="c.prop" :label="c.label"  :sortable="c.sortable"
                           :show-overflow-tooltip="c.showOverflowTooltip">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <!--操作-->
          <el-table-column v-else-if="c.type==='operate'" :label="c.label" :width="c.width">
            <template slot-scope="scope">
              <el-button-group>
                <el-tooltip v-for="b of c.details" effect="light" :content="b.label" placement="bottom-start">
                  <el-button  size="mini" :type="b.type" :icon="b.icon"
                              @click="handleOperate(b.command,scope.$index, scope.row)"></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
          <!--其它-->
          <el-table-column v-else
                           :prop="c.prop" :label="c.label" :sortable="c.sortable"
                           :show-overflow-tooltip="c.showOverflowTooltip" >
          </el-table-column>
        </template>
      </slot>
    </el-table>
    <!--内容 平铺显示-->
    <div  v-else  style="padding-left: 25px;font-size: smaller">
      <el-divider></el-divider>
      <div v-for=" (c,index) of tableData">
        <template v-for=" st in columns">
          <p v-if="st.type === 'selection'">
            <el-checkbox :label="c[st.prop]" v-model="checkList"></el-checkbox>
          </p>
          <p v-else-if="st.type ==='operate'">
            <b>{{st.label}}:</b>
            <el-button-group>
              <el-tooltip v-for="b of st.details" effect="light" :content="b.label" placement="bottom-start">
                <el-button  size="mini" :type="b.type" :icon="b.icon"
                            @click="handleOperate(b.command,index, c)"></el-button>
              </el-tooltip>
            </el-button-group>
          </p>
          <p v-else>
            <b>{{st.label}}：</b><span>{{c[st.prop]}}</span>
          </p>
        </template>
        <el-divider></el-divider>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name:"myNormalTable",
    props:{
      isShowTable: {
        type:Boolean,
        default:true
      },
      maxHeight:{
        type:Number,
      },
      columns:{
        type:Array,
        default:() => []
      },
      tableData: {
        type: Array,
        default: () => []
      }
    },
    data(){
      return {
        checkList:[]
      }
    },
    methods: {
      //多选事件
      handleSelectionChange(val) {
        //this.checkList = val.map(v => v.id);
        this.checkList = val;
      },
      handleOperate(command,index,row){
        this.$emit("operateClick",command,row.id)
      }
    },
    watch:{
      checkList(newValue,oldValue){
        this.$emit("multipleClick",newValue)
      }
    }
  }
</script>

<style lang="scss">
    .table-box{
      width: 100%;
        th,td{
            padding: 0 !important;
            height: 18px;
            line-height: 18px;
        }
    }
</style>