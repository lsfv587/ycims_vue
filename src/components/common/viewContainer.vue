<template>
  <div>
    <div class="view-search">
      <slot name="search"></slot>
    </div>
    <div class="view-content">
      <div class="view-content-operate">
        <slot name="operate"></slot>
      </div>
      <div class="view-content-content">
        <slot name="content"></slot>
      </div>
      <div class="view-content-content">
        <slot name="content-pagination"></slot>
      </div>
      <div class="view-content-content">
        <slot name="content-two"></slot>
      </div>
      <div class="view-content-content">
        <slot name="content-others"></slot>
      </div>
    </div>
  </div>
</template>

  <script>
    export default {
    name: "viewContainer"
  }
</script>

<style lang="scss" scoped>
  .view-search,.view-content{
    margin: 5px 3px;
    box-shadow: #666 0px 0px 3px;
    border-radius: 5px;
    float: left;
    width: 98%;
    height: 100%;
  }
  .view-content-operate,.view-content-content{
    float: left;
    width: 100%;
    height: 100%;
  }
</style>