<script setup lang="ts">
const api = 'https://web-blog.api.lnkkerst.me/api'
const nodes = ref()
const posts = ref();
const loading = ref(true);
const nodeFetch = (id: number | null) => {
    $fetch('/posts', {
        baseURL: api,
        server: false,
        method: "GET",
        retry: 3,
        retryDelay: 500,
        timeout: 3000,
        query: {
            page: 0,
            size: 10,
            "nodeId.equals": id
        }
    }).then((res) => {
        posts.value = res
        loading.value = false
    }).catch((err) => {
        console.log(err.data)
    })
}
onMounted(()=>{
    $fetch('/nodes', {
        baseURL: api,
        server: false,
        method: "GET",
        retry: 3,
        retryDelay: 500,
        timeout: 3000,
    }).then((res)=>{
        nodeFetch(null)
        nodes.value=res
    }).catch((err)=>{console.log(err.data)})
})

</script>

<template>
    <el-row>
        <el-check-tag
            v-for="node in nodes"
            :type="''"
            size="large"
            style="margin: 0 0 5px 20px; font-size: medium; font-weight: 300;"

        >
            <nuxt-link style="color: #66b1ff; text-decoration: none" @click="()=>{
                nodeFetch(node.id)
            }">
                {{ node.name }}
            </nuxt-link>
        </el-check-tag>
    </el-row>
    <div v-loading="loading" style="min-width: 600px; min-height: 600px">
        <postcard v-for="post in posts" v-bind="post"/>
    </div>
</template>

<style scoped>

</style>