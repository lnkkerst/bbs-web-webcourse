<script setup lang="ts">

const api = 'https://web-blog.api.lnkkerst.me/api';

const loading = ref(true);

const router = useRouter();

interface CountData {
    NODE: number;
    POSTER: number;
    POST: number;
}

const num = ref<CountData>({
    NODE: 0,
    POSTER: 0,
    POST: 0
});

const dataFetch = (type: keyof CountData)=>{
    $fetch('/favorites/count', {
        baseURL: api,
        server: false,
        method: "GET",
        retry: 3,
        retryDelay: 500,
        timeout: 3000,
        query:{
            "posterId.equals": 1,
            "type.in": type
        }
    }).then((res)=>{
        num.value[type] = Number(res)
        loading.value = false
    }).catch((err)=>{console.log(err.data)})
}

const goToUser = (name: string)=>{
    router.push({
        path: "/user/favorites",
        query: {
            item: name
        }
    })
}

onMounted(()=>{
    dataFetch("NODE")
    dataFetch("POSTER")
    dataFetch("POST")
})
</script>
<template>
    <el-card style="">
        <el-row slot="header" style="justify-content: space-around; margin-bottom: 20px">
            <el-text>用户名: V2EX</el-text>
            <el-button>操作</el-button>
        </el-row>
        <el-row style="justify-content: space-around">
            <div style="display: flex; justify-content: center; flex-direction: column" @click="()=>{
                goToUser('NODE')
            }">
                <p style="color: #1d3043; font-size: large;text-align: center">{{(num.NODE || 0)}}</p>
                <p>节点收藏</p>
            </div>
            <el-divider direction="vertical" style="height: inherit;"/>
            <div style="display: flex; justify-content: center; flex-direction: column" @click="()=>{
                goToUser('POST')
            }">
                <p style="color: #1d3043; font-size: large;text-align: center">{{(num.POST || 0)}}</p>
                <p>帖子收藏</p>
            </div>
            <el-divider direction="vertical" style="height: inherit;"/>
            <div style="display: flex; justify-content: center; flex-direction: column" @click="()=>{
                goToUser('POSTER')
            }">
                <p style="color: #1d3043; font-size: large;text-align: center">{{(num.POSTER || 0)}}</p>
                <p>特别关注</p>
            </div>
        </el-row>
        <div style="min-height: 30px"></div>
        <time style="font-size: small; float: right">最后登录时间: 2022-01-01</time>
    </el-card>
</template>



<style scoped>
</style>
