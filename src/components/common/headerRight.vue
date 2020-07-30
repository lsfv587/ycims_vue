<template>
    <div class="header-right">
        <div class="header-user-con">
            <!--全屏按钮-->
            <slot name="fullscreen-btn"></slot>
            <!--消息中心-->
            <slot name="bell-btn"></slot>
            <!--其他-->
            <slot name="others-btn"></slot>
            <!--用户头像-->
            <slot name="user-avator"></slot>
            <!--用户下拉框-->
            <slot name="user-dropdown"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "headerRight"
    }
</script>

<style scoped>
    .header-right{
        float: right;
        padding-right: 50px;
    }
    .header-user-con{
        display: flex;
        height: 70px;
        align-items: center;
    }
</style>