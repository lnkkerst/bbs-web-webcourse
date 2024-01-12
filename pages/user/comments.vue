<script setup lang="ts">
const api = 'https://web-blog.api.lnkkerst.me/api';
const comments = ref();
const loading = ref(true)
onMounted(()=>{
    $fetch('/comments', {
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
        console.log(res)
        comments.value = res
        loading.value = false
    }).catch((err)=>{console.log(err.data)})
})
</script>

<template>
    <div v-loading="loading" style="min-width: 600px; min-height: 450px">
        <commentcard v-for="comment in comments" v-bind="comment"/>
    </div>
</template>

<style scoped>

</style>