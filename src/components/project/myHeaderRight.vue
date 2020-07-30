<template>
  <div>
    <header-right>
      <!--全屏按钮-->
      <fullscreen-button slot="fullscreen-btn"></fullscreen-button>
      <!--系统布局设置-->
      <el-popover slot="others-btn" class="btn-setting"
              placement="right"
              width="100"
              trigger="hover">
        <el-form>
          <el-form-item label="菜单标签栏:">
            <el-switch v-model="layout.isShowContentTag" active-color="#13ce66" inactive-color="#ff4949"
                       @change="OnShowChange"/>
          </el-form-item>
          <el-form-item label="系统Logo:">
            <el-switch v-model="layout.isShowLogo" active-color="#13ce66" inactive-color="#ff4949"
                       @change="OnShowChange"/>
          </el-form-item>
          <el-form-item label="菜单面包屑:">
            <el-switch v-model="layout.isShowBreadcrumb" active-color="#13ce66" inactive-color="#ff4949"
                       @change="OnShowChange"/>
          </el-form-item>
        </el-form>
        <i slot="reference" class="el-icon-setting"></i>
      </el-popover>
      <!--用户头像-->
      <div slot="user-avator" class="user-avator">
        <img :src="getUserIcon">
      </div>
      <!--用户下拉操作-->
      <el-dropdown slot="user-dropdown" class="user-name" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
          {{getUserName}} <i class="el-icon-caret-bottom"></i>
      </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided  command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header-right>
  </div>
</template>

<script>
  import headerRight from "../common/headerRight";
  import fullscreenButton from "../common/fullscreenButton";
  import auth from '@/tool/auth'
  export default {
    name: "myHeaderRight",
    components:{headerRight,fullscreenButton},
    data(){
      return {
        layout:{
          isShowLogo:this.$store.state.app.isShowLogo,
          isShowBreadcrumb:this.$store.state.app.isShowBreadcrumb,
          isShowContentTag:this.$store.state.app.isShowContentTag,
        }
      }
    },
    computed:{
      getUserName()
      {
        return this.$store.getters.getUser.username;
      },
      getUserIcon(){
        return this.$store.getters.getUser.user_icon;
      }
    },
    methods:{
      handleCommand(command){
        if (command === 'logout')
        {
          auth.logout()
        }
      },
      OnShowChange()
      {
        this.$store.commit("setLayoutShow",this.layout)
      }
    },
  }
</script>

<style scoped>
  .user-name{
    margin-left: 10px;
  }
  .user-avator{
    margin-left: 20px;
  }
  .user-avator img{
    width:30px;
    height:30px;
    border-radius: 50%;
  }
  .el-dropdown-link{
    color: #fff;
    cursor: pointer;
  }
  .btn-setting{
    margin-right: 5px;
    font-size: 24px;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
</style>