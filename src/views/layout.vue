<template>
  <div>
    <my-header />
    <my-left-side-nav />
    <my-content-container />
  </div>
</template>

<script>
  import myHeader from "../components/project/myHeader";
  import myLeftSideNav from "../components/project/myLeftSideNav";
  import myContentContainer from "../components/project/myContentContainer";
  export default {
    components:{myContentContainer, myLeftSideNav, myHeader }
  }
</script>