<script setup lang="ts">
const comment = defineProps({
    id: Number,
    content: String,
    createdAt: String,
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
})
const timeAt = ref()
onMounted(()=>{
    try {
        timeAt.value = new Date((comment.createdAt || "").slice(0, -1)).toLocaleDateString(undefined, {
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
    <el-card style="width: 600px; margin: 20px">
        <el-row style="display: flex; justify-content: center; flex-direction: row">
            <el-col :span="3" style="display:flex; justify-content: center; align-items: center">
<!--                .node.name-->
                <el-tag type="success" round>{{ comment.post }}</el-tag>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="17">
                <el-row style="font-size: large; margin-bottom: 7px">
                    <el-link :underline="false" style="width: 500px; justify-content: start">
                        <el-text truncated style="width: 350px">{{ comment.post }}</el-text>
                    </el-link>
                </el-row>
                <el-row>
                    <el-text truncated style="width: 350px">Re: {{ comment.content }}</el-text>
                </el-row>
            </el-col>
            <el-col :span="1"></el-col>
            <el-col :span="2" style="display: flex; justify-content: center; align-items: center">
                <el-tag>{{ timeAt }}</el-tag>
            </el-col>
        </el-row>
    </el-card>
</template>

<style scoped>

</style>