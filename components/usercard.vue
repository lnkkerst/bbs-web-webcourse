<script setup lang="ts">
const user_info = ref({
    "node_collection": 0,
    "topic_collection": 0,
    "star": 0
})

</script>
<template>
    <el-card style="">
        <el-row slot="header" style="justify-content: space-around; margin-bottom: 20px">
            <el-text>用户名: V2EX</el-text>
            <el-button>操作</el-button>
        </el-row>
        <el-row style="justify-content: space-around">
            <div style="display: flex; justify-content: center; flex-direction: column">
                <p style="color: #1d3043; font-size: large;text-align: center">{{user_info.node_collection}}</p>
                <p>节点收藏</p>
            </div>
            <el-divider direction="vertical" style="height: inherit;"/>
            <div style="display: flex; justify-content: center; flex-direction: column">
                <p style="color: #1d3043; font-size: large;text-align: center">{{user_info.topic_collection}}</p>
                <p>主题收藏</p>
            </div>
            <el-divider direction="vertical" style="height: inherit;"/>
            <div style="display: flex; justify-content: center; flex-direction: column">
                <p style="color: #1d3043; font-size: large;text-align: center">{{user_info.star}}</p>
                <p>特别关注</p>
            </div>
        </el-row>
        <div style="min-height: 30px"></div>
        <time style="font-size: small; float: right">最后登录时间: 2022-01-01</time>
    </el-card>
</template>



<style scoped>
</style>
