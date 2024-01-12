<script setup lang="ts">
const api = 'https://web-blog.api.lnkkerst.me/api';
const favorites = ref();
const loading = ref(true)
const route = useRoute()
onMounted(()=>{
    route.query.item
    $fetch('/favorites', {
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
        favorites.value = res
        loading.value = false
    }).catch((err)=>{console.log(err.data)})
})
</script>

<template>
    <div v-loading="loading" style="min-width: 600px; min-height: 450px">
        <favoritecard v-for="favorite in favorites" v-bind="favorite"/>
    </div>
</template>

<style scoped>

</style>