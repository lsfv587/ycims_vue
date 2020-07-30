<template>
    <head-bar class="header">
        <img v-if="isShowLogo" class="app-logo" slot="logo"
             src="../../assets/img/iitc-logo.png" />
        <collapse-button class="collapse-btn" slot="collapse-btn" :width=30 :height=30
                         @collapseClick="onCollapseClick"
                         :is-active="!isCollapsed"/>
        <div slot="app-name" class="appName">{{getAppName}}</div>
        <my-header-right slot="header-right" />
    </head-bar>
</template>

<script>
    import HeadBar from "../common/headBar";
    import MyHeaderRight from "./myHeaderRight";
    import CollapseButton from "../common/collapseButton";
    export default {
        name: "myHeader",
        components: {MyHeaderRight, HeadBar,CollapseButton},
        computed:{
            getAppName(){
                return this.$store.state.app.appName;
            },
            isCollapsed()
            {
                return this.$store.getters.getCollapsed
            },
            isShowLogo()
            {
                return this.$store.state.app.isShowLogo && !this.isCollapsed
            }
        },
        methods:{
            onCollapseClick(){
                this.$store.commit('leftMenuCollapsed') ;
            },

        }
    }
</script>

<style scoped>
    .header{
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 50px;
        font-size: 22px;
        color: #fff;
        background: #3c8dbc;
    }
    .app-logo{
        float: left;
        width:216px;
        height: 50px;
        line-height: 50px;
    }
    .collapse-btn{
        float: left;
        padding: 10px 10px;
    }
    .collapse-btn:hover{
        background: #0864c4;
    }
    .appName{
        float: left;
        text-align: center;
        line-height: 50px;
        margin-left: 10px;
    }
</style>