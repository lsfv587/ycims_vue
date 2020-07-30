<template>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="!fixHome || fixHome !== ''">{{fixHome}}</el-breadcrumb-item>
        <el-breadcrumb-item v-for="i of items">{{i}}</el-breadcrumb-item>
      </el-breadcrumb>
</template>
  
<script>
  export default {
    name: "breadCrumb",
    props:{
      fixHome:{
        String:String,
        default:''
      },
      items:{
        type:Array,
        default: () =>{
          return ['活动管理','活动列表','活动详情']
        }
      }
    }
  }
</script>

<style scoped>
</style>
