<script lang="ts" setup>

</script>

<template>
    <el-container class="layout">
        <el-header class="header">
            <top/>
        </el-header>
        <el-container class="bg-color">
            <el-main style="width: 690px; min-height: 400px">
                <slot/>
            </el-main>
            <el-aside>
                <usercard/>
            </el-aside>
        </el-container>
    </el-container>
</template>

<style>

.layout {
    align-items: center;
    background-color: #E5EAF3
}

.header{
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    box-shadow: 0 3px 20px #636466;
    padding: 0;
}

.bg-color{
    margin-top: 30px;
}

</style>