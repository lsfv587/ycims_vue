<template>
  <div style="clear: both">
    <span class="op-left">
      <slot name="left"></slot>
    </span>
    <span class="op-right" >
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
  export default {
    name: "operateBar"
  }
</script>

<style scoped>
  .op-left{
    float: left;
    padding: 10px 5px 10px 15px;
    overflow: hidden;
  }
  .op-right{
    float: right;
    padding: 10px 15px 10px 5px;
    overflow: hidden;
  }
</style>