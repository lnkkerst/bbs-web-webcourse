<script setup lang="ts">
const favorite = defineProps({
    type:String,
    count: String,
    items: {
        type: Array,
        required: true,
        default: () => ([{
            id: Number,
            name: String,
        }])
    }
})
const trans = {
    NODE: "节点",
    POST: "帖子",
    POSTER: "用户"
}
</script>

<template>
    <el-collapse-item>
        <template #title>
            {{trans[favorite.type]}}
            <el-tag type="success" style="float: right">
                {{favorite.count}}
            </el-tag>
        </template>
        <el-card v-for="item in favorite.items">
            <el-row>
                {{item.id}}
            </el-row>
            <el-row>
                {{item.name}}
            </el-row>
        </el-card>
    </el-collapse-item>
</template>

<style scoped>

</style>