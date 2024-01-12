<script setup lang="ts">
  const cardData = defineProps({
      id: { type: Number, required: true },
      title: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: String, required: true },
      poster: {
          type: Object,
          required: true,
          default: () => ({
              id: Number,
              user: {
                  id: Number,
                  login: String
              }
          })
      },
      node: {
          type: Object,
          required: true,
          default: () => ({
              id: Number,
              name: String
          })
      }
  })

  const timeAt = ref()
  onMounted(()=>{
      try {
          timeAt.value = new Date(cardData.createdAt.slice(0, -1)).toLocaleDateString(undefined, {
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
        <el-tag type="success" round>{{ cardData.poster.id }}</el-tag>
      </el-col>
        <el-col :span="1"></el-col>
      <el-col :span="17">
        <el-row style="font-size: large; margin-bottom: 7px">
          <el-link :underline="false" style="width: 500px; justify-content: start">
              <el-text truncated style="width: 350px">{{ cardData.title }}</el-text>
          </el-link>
        </el-row>
        <el-row>
          <el-tag :type="'success'" size="small" round>{{ cardData.node.name }}</el-tag>
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
