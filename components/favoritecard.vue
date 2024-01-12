<script setup lang="ts">
const favorite = defineProps({
        id: Number,
        content: String,
        createdAt: {
            type: String,
            required: true
        },
        reply: String,
        post: {
            type: Object,
            required: true,
            default: () => ({
                id: Number,
                title: String,
                content: String,
                createdAt: String,
                poster: {
                    id: Number,
                    user: {
                        id: Number,
                        login: String
                    }
                },
                node: {
                    id: Number,
                    name: String
                }
            })
        }
    }
)

const open = defineProps({
    name: String
})

const open_ = ref(open)

const timeAt = ref()
onMounted(()=>{
    try {
        timeAt.value = new Date((favorite.createdAt || "").slice(0, -1)).toLocaleDateString(undefined, {
            month: 'long',
            day: 'numeric',
        })
    }
    catch (e){
        console.log("timeAt is null !")
    }
});
</script>

<template>
    <el-collapse v-model="open_" accordion >
        <favoriteitem/>
    </el-collapse>
</template>

<style scoped>

</style>