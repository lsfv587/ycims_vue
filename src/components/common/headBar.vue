<template>
    <div>
        <!--系统logo-->
        <slot name="logo"></slot>
        <!--折叠按钮-->
        <slot name="collapse-btn">
        </slot>
        <!--系统名称-->
        <slot name="app-name"></slot>
        <!--右侧内容-->
        <slot name="header-right"></slot>
    </div>
</template>

<script>
    export default {
        name: "headBar",
    }
</script>
