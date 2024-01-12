<script setup lang="ts">
const api = 'https://web-blog.api.lnkkerst.me/api';
const posts = ref();
const loading = ref(true)
onMounted(()=>{
    $fetch('/posts', {
        baseURL: api,
        server: false,
        method: "GET",
        retry: 3,
        retryDelay: 500,
        timeout: 3000,
        query:{
            "posterId.equals": 1
        }
    }).then((res)=>{
        posts.value = res
        loading.value = false
    }).catch((err)=>{console.log(err.data)})
})
</script>

<template>
    <div v-loading="loading" style="min-width: 600px; min-height: 450px">
        <postcard v-for="post in posts" v-bind="post"/>
    </div>
</template>

<style scoped>

</style>