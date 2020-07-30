<template>
  <div>
    <slot name="collapse-btn"></slot>
    <slot name="breadcrumb"></slot>
    <slot name="tag"></slot>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contentContainer"
  }
</script>

<style scoped>
  .content {
    width: auto;
    height: auto;
    padding: 5px;
    /*overflow-y: scroll;*/
    box-sizing: border-box;
  }
</style>