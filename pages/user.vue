<script setup lang="ts">
const api = 'https://web-blog.api.lnkkerst.me/api';
const router = useRouter();
const user = ref({});
const search = ref();

onMounted(()=>{
    router.push({path: "/user/userposts"})
})

</script>

<template>
    <el-menu mode="horizontal" :ellipsis="false" style="flex-direction: row;justify-content: center; align-items: center; border-radius: 10px;width: 600px; margin: 0 20px 0 20px" default-active="1">
        <div style="flex-grow: 1" />
        <el-menu-item index="1" class="menu-font-size" style="text-decoration: none">
            <nuxt-link to="/user/userposts" style="text-decoration: none">帖子</nuxt-link>
        </el-menu-item>
        <el-menu-item index="2" class="menu-font-size" style="text-decoration: none">
            <nuxt-link to="/user/comments" style="text-decoration: none">回复</nuxt-link>
        </el-menu-item>
        <el-menu-item index="3" class="menu-font-size" style="text-decoration: none">
            <nuxt-link to="/user/favorites" style="text-decoration: none">收藏</nuxt-link>
        </el-menu-item>
        <div style="flex-grow: 1" />
    </el-menu>
    <nuxt-page/>
</template>

<style scoped>
</style>
