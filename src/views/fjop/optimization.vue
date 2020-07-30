<template>
  <view-container>
    <div slot="search" class="my-view-content-search">
      <el-form :inline="true" :model="optimizationForm" :rules="rules" ref="optimizationForm">
        <el-form-item label="订单日期:" prop="orderDate">
          <el-date-picker
                  value-format="yyyyMMdd"
                  v-model="optimizationForm.orderDate"
                  type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="分拣线" prop="lineCode">
          <el-select v-model="optimizationForm.lineCode" clearable placeholder="请选择">
            <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button-group>
            <el-button @click="OnReset" size="mini" type="warning" round icon="el-icon-refresh-right">重置</el-button>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <!--分拣操作栏-->
    <operate-bar slot="operate">
      <el-button-group slot="left">
        <el-button @click="downData('optimizationForm')" size="mini" type="primary" icon="el-icon-sold-out">开始优化</el-button>
      </el-button-group>
    </operate-bar>
    <!--分拣步骤表格--->
    <div slot="content">
      <el-table
              ref="multipleTable"
              fit
              border
              stripe
              highlight-current-row
              tooltip-effect="dark"
              :data="stepData"
              @selection-change="stepSelectionChange">
        <el-table-column type="selection" prop="code"></el-table-column>
        <el-table-column label="代码" prop="code"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="顺序" prop="sequence"></el-table-column>
      </el-table>
    </div>
    <div slot="content-two" class="_pagination">
      <el-steps :active="stepActive">
        <el-step v-for="name of getOpStepNames" :title="name" ></el-step>
      </el-steps>
    </div>
    <div slot="content-others">
      <!--分拣线路选择对话框-->
      <el-dialog title="请选择需要分拣的线路" :visible.sync="dialogPathVisible"
                 :show-close="false" >
        <el-table
                class="table-box" ref="multipleTable" fit border stripe
                height="350px"
                highlight-current-row
                tooltip-effect="dark"
                :data="pathData"
                @selection-change="pathSelectionChange">
          <el-table-column type="selection" prop="id"></el-table-column>
          <el-table-column label="线路代码" prop="pathCode" width="130px"></el-table-column>
          <el-table-column label="线路名称" prop="pathName"></el-table-column>
          <el-table-column label="数量" prop="qty" width="60px"></el-table-column>
        </el-table>
        <el-row>
          <el-col :span="24" ><strong style="color: red">总计：{{pathTotal}}</strong></el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8" :offset="10">
            <el-button type="primary" @click="OnPathConfirm()">确定</el-button>
            <el-button type="warning" @click="dialogPathVisible = false">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </view-container>
</template>

<script>
  import ViewContainer from "../../components/common/viewContainer"
  import {request} from "../../network/request"
  import OperateBar from "../../components/common/operateBar";
  export default {
    name: "optimization",
    components: {OperateBar,ViewContainer},
    data(){
      return {
        stepData:[],
        pathData:[],
        pathTotal:0,
        opStepCodes:[],
        pathIds:[],
        stepActive:-1,
        dialogPathVisible: false,
        optimizationForm:{
          orderDate:'',
          lineCode:'',
        },
        rules: {//表单规则
          orderDate: [
            { required: true, message: '请选择订单日期', trigger: 'blur' }
          ],
          lineCode: [
            { required: true, message: '请选择分拣线', trigger: 'blur' }
          ]
        },
        options:[{
          value: '1',
          label: '分拣线1'
        }]
      }
    },
    computed:{
      getOpStepNames(){
        return this.opStepCodes.map(s => {return s.name})
      },
      getOpStepCodes()
      {
        return this.opStepCodes.map(s => {return s.code});
      }
    },
    methods:{
      stepSelectionChange(value){//分拣步骤选择事件
        this.opStepCodes = value;
      },
      pathSelectionChange(value){//分拣线路选择事件
        this.pathTotal = 0;
        if (value && value.length > 0){
          value.forEach(item =>{
            this.pathTotal += item.qty;
            this.pathIds.push(item.id);
          })
        }
      },
      downData(ruleForm){
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
              if(this.getOpStepCodes.length === 0)
              {
                this.$message({
                  type:"warning",
                  message:"请选择优化步骤"
                });
                return ;
              }
            if (this.getOpStepCodes.indexOf("1000") === -1){
              this.$message({type:"warning",message:"请选择’下载数据‘步骤！"});
              return;
            }
            this.stepActive = 0;//更新步骤条
              //1.下载分拣数据
              request({
                config:{
                  url:"/op/downData",
                  method: "post",
                  responseType:'json',
                  xhrFields: {
                    withCredentials: true
                  },
                  data: this.optimizationForm
                }
              }).then(res =>{
                if(res.code === 200){
                  this.stepActive = 1;
                  if(this.getOpStepCodes.indexOf("2000") !== -1){
                    this.getPathInfo();//获取线路选择信息
                  }
                }else{
                  this.$message({
                    type:res.type,
                    message: res.message
                  })
                }
              }).catch(error =>{
                this.$message({
                  type:"error",
                  message:"接口服务异常,原因：" + error.message
                })
              })
          } else {
            return false;
          }
        });
      },
      getPathInfo(){//获取线路选择信息
        request({
          config: {
            url: "/op/selectPath",
            method: "get",
            responseType: 'json',
            xhrFields: {
              withCredentials: true
            },
            params: {
              orderDate: this.optimizationForm.orderDate,
              lineCode: this.optimizationForm.lineCode
            }
          }
        }).then(res => {
          if (res.code === 200) {
            this.dialogPathVisible = true;//打开线路选择对话框
            this.pathData = res.data;
          }
          else{
            this.$message({
              type: res.type,
              message: res.message
            })
          }
        }).catch(error => {
          this.$message({
            type: "error",
            message: "接口服务异常,原因：" + error.message
          })
        });
      },
      OnPathConfirm(){
        //更新选择的分拣线路
        if(this.pathIds.length === 0)
        {
          this.$message({type:"warning",message:"请选择需要分拣的线路！"})
          return;
        }
        request({
          config:{
            url:"/op/selectPath",
            method: "post",
            responseType:'json',
            xhrFields: {
              withCredentials: true
            },
            data: {
              pathIds:this.pathIds
            }
          }
        }).then(res =>{
          if(res.code === 200){
            this.dialogPathVisible = false;
            this.dataOptimization();
          }
          else {
            this.$message({
              type:res.type,
              message: res.message
            })
          }
        }).catch(error =>{
          this.$message({
            type:"error",
            message:"接口服务异常,原因：" + error.message
          })
        })
      },
      dataOptimization(){//2.执行数据优化步骤
        request({
          config:{
            url:"/op/optimization",
            method: "post",
            responseType:'json',
            xhrFields: {
              withCredentials: true
            },
            data: this.optimizationForm
          }
        }).then(res =>{
          if(res.code === 200){
            this.stepActive = 2;
            this.sendOneProject();
          }
          else {
            this.$message({
              type:res.type,
              message: res.message
            })
          }
        }).catch(error =>{
          this.$message({
            type:"error",
            message:"接口服务异常,原因：" + error.message
          })
        })
      },
      sendOneProject(){//3.发送一号工程
        if (this.getOpStepCodes.indexOf("3000") !== -1){
          this.stepActive = 3;
          this.$message({type:"success",message:"数据优化成功！"})
        }
      },
      OnReset(){//重置条件
        this.optimizationForm.orderDate = '';
        this.optimizationForm.lineCode = '';
      }
    },
    created() {
      this.stepData = [
        {id:1000,code:"1000",name:"数据下载",sequence:1},
        {id:2000,code:"2000",name:"数据优化",sequence:2},
        {id:3000,code:"3000",name:"一号工程",sequence:3}];
    }
  }
</script>

<style lang="scss" scoped>
  ._search {
    padding: 10px 0 20px 10px;
    font-size: small;
    span,p{
      margin: 5px;
    }
  }
  ._operate-bar{
    padding: 10px 0 20px 10px;
  }
  ._pagination{
    padding: 15px;
  }
  .table-box{
    width: 100%;
    th,td{
      padding: 0 !important;
      height: 18px;
      line-height: 18px;
    }
  }
</style>