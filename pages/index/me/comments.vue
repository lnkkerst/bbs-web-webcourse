<script setup lang="ts">
const userStore = useUserStore();

const commentsFetch = await useBlogFetch("/api/comments", {
  query: computed(
    () =>
      ({
        "userId.equals": userStore.user?.id,
      }) as any,
  ),
});
</script>

<template>
  <q-card class="relative">
    <q-list class="">
      <q-inner-loading
        color="primary"
        :showing="commentsFetch.pending.value"
      ></q-inner-loading>
      <template v-for="comment in commentsFetch.data.value">
        <NuxtLink :to="`/p/${comment.post?.id}`">
          <q-item clickable>
            <q-item-section v-if="false" avatar class="items-center w-64px">
              <q-avatar size="44px">
                <q-img :src="comment.user.imageUrl || defaultAvatar" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>{{ comment.content }}</q-item-label>

              <q-item-label caption class="">
                <span>
                  {{ `回复给 #${comment?.post?.id} ${comment?.post?.title}` }}
                </span>
              </q-item-label>
            </q-item-section>

            <q-item-section side bottom>
              {{ new Date(comment.createdAt).toLocaleString() }}
            </q-item-section>
          </q-item>
        </NuxtLink>
        <q-separator></q-separator>
      </template>
    </q-list>

    <q-card-section
      v-if="!commentsFetch.data.value || commentsFetch.data.value.length === 0"
    >
      你还没有评论
    </q-card-section>
  </q-card>
</template>
