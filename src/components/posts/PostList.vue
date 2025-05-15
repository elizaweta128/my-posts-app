<script>

import PostItem from "@/components/posts/PostItem.vue";

export default {
  name: "PostList",
  components: {PostItem},
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  emits: ['delete-post', 'open-post'],
}
</script>

<template>
  <div v-if="posts.length > 0">
    <div class="post-list">
      <transition-group name="post-list">
        <PostItem v-for="post in posts" :key="post.id" :post="post" @delete-post="$emit('delete-post', $event)"
                  @open-post="$emit('open-post', $event)"/>
      </transition-group>
    </div>
  </div>
  <div v-else class="post-item">
    <h3 style="color: #9c1010; font-weight: bold; font-size: 30px; text-align: center">Список
      постов пуст</h3>
  </div>
</template>

<style scoped>
.post-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}


</style>

