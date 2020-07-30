<template>
  <my-view-container
          :table-name="tableName" :data="data" :columns="columns" :total="total"
          @operateClick="onOperateClick"
          @pageChange="onPageChange">
    <div slot="my-search" class="my-view-content-search">
      <el-form :model="userVo" :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="userVo.userName" class="view-content-search-input" autocomplete="off"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
        </el-form-item>
      </el-form>

      <el-dialog  title="添加用户" :visible.sync="addVisible">
        <el-form :model="userVo">
          <el-form-item label="用户名" label-width="120px">
            <el-col :span="11">
              <el-input v-model="userVo.userName" autocomplete="off" ></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" label-width="120px">
            <el-col :span="11">
              <el-input v-model="userVo.password" autocomplete="off"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </my-view-container>
</template>

<script>
  import MyViewContainer from "../../components/project/myViewContainer";
  import {request} from "../../network/request"
  export default {
    name: "user",
    components: {MyViewContainer},
    data(){
      return {
        tableName:'用户信息表',
        columns:[],
        data:[],
        total:0,
        value1:"",
        addVisible:false,
        pageIndex:1,
        pageSize:10,
        userVo:{
          id:'',
          userName:'',
          password:'',
          isLock:'',
          createTime:''
        }
      }
    },
    methods:{
      onPageChange(pageInfo){
        this.pageSize = pageInfo.size;
        this.pageIndex = pageInfo.index;
        this.query();
      },
      onOperateClick(command,value){
        if(command === "add"){
          this.addVisible = true;
        }else if(command === "edit"){
          this.addVisible = true;
        }else if(command === "deleteSelected"){

        }
        else {
          this.$confirm('此操作会删除该用户, 请确认是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.delete(value);
          })
        }
      },
      add(){
        request({
          config: {
            url:"/api/user",
            method: "post",
            responseType:'json',
            xhrFields: {
              withCredentials: true
            },
            data:this.userVo
          }
        }).then(res => {
          if (res.code === 200){
            this.addVisible = false;
            this.resetUserVo();
            this.$message({
              type:"success",
              message:"添加成功！"
            })
          }else {
            this.$message({
              type:"error",
              message:"添加失败！"
            })
          }
        }).catch(error =>{
          this.$message({
            type:"error",
            message:"添加失败,原因：" + error.message
          })
        })
      },
      edit(){
        request({
          config: {
            url:"/api/user",
            method: "put",
            responseType:'json',
            data:this.userVo
          }
        }).then(res => {
          if (res.code === 200){
            this.addVisible = false;
            this.resetUserVo();
            this.$message({
              type:"success",
              message:"编辑成功！"
            })
          }else {
            this.$message({
              type:"error",
              message:"编辑失败！"
            })
          }
        }).catch(error =>{
          this.$message({
            type:"error",
            message:"编辑失败,原因：" + error.message
          })
        })
      },
      delete(id){
        request({
          config: {
            url:"/api/user",
            method: "delete",
            responseType:'json',
            data:{
              id:id
            }
          }
        }).then(res => {
          if (res.code === 200){
            this.addVisible = false;
            this.$message({
              type:"success",
              message:"删除成功！"
            })
          }else {
            this.$message({
              type:"error",
              message:"删除失败！"
            })
          }
        }).catch(error =>{
          this.$message({
            type:"error",
            message:"添加失败,原因：" + error.message
          })
        })
      },
      query(){
        request({
          config: {
            url:"/api/user/page",
            method: "get",
            responseType:'json',
            params: {
              index:this.pageIndex,
              size:this.pageSize,
              userName:this.userVo.userName
            }
          }
        }).then(res => {
          this.data = res.data.data;
          this.total = res.data.total;
        })
      },
      resetUserVo(){
        this.userVo.userName = "";
        this.userVo.password = "";
        this.userVo.isLock = "";
        this.userVo.createTime = "";
      }
    },
    created() {
      this.query({
        index:1,
        size:10
      });
      this.columns = [{
        type:'selection',
        prop:"id",
        label:"id",
        isShow:true,
        showOverflowTooltip:true
      },{
        type:'',
        prop:"userName",
        label:"用户名",
        isShow:true,
        showOverflowTooltip:true,
        sortable:true
      }, {
        type:'',
        prop:"password",
        label:"密码",
        isShow:true,
        showOverflowTooltip:true,
        sortable:true
      }, {
        type:'',
        prop:"isLock",
        label:"状态",
        isShow:true,
        showOverflowTooltip:true,
        sortable:true
      },{
        type:'',
        prop:"createTime",
        label:"创建时间",
        isShow:true,
        showOverflowTooltip:true,
        sortable:true
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