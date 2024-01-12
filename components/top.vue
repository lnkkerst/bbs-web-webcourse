<template>
    <el-menu mode="horizontal" :ellipsis="false" class="menu-width" default-active="2">
        <div class="flex-grow" />
        <el-menu-item index="0">
            <img style="width: 100px" alt="Element logo" src=""/>
        </el-menu-item>
        <el-menu-item index="1">
            <el-input v-model="search" placeholder="" />
        </el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="2" class="menu-font-size">
            <nuxt-link to="/" style="text-decoration: none">首页</nuxt-link>
        </el-menu-item>
        <el-menu-item index="3" class="menu-font-size">
            <nuxt-link to="/user/userposts" style="text-decoration: none">用户</nuxt-link>
        </el-menu-item>
        <el-menu-item index="4" class="menu-font-size">
            <nuxt-link to="/" style="text-decoration: none">设置</nuxt-link>
        </el-menu-item>
        <el-menu-item index="5" class="menu-font-size">
            <nuxt-link to="/" style="text-decoration: none">登出</nuxt-link>
        </el-menu-item>
        <div class="flex-grow" />
    </el-menu>
</template>
<script lang="ts" setup>
const search = ref('')
</script>

<style>
.flex-grow{
    flex-grow: 1;
}

.menu-width{
    width: 100%;
    background-color: #FFFFFF;
}

.menu-font-size{
    font-size: 20px;
}
</style>
