<script>


export default {
  name: "PostItem",
  props: {
    post:{
      type: Object,
      required: true,
    },
  },
  emits: ['delete-post', 'open-post'],
}
</script>

<template>
  <div class="post">
    <div  class="postDescription">
      <div><strong>Назва:</strong> {{ post.title}}</div>
      <div><strong>Опис:</strong> {{ post.body }}</div>
    </div>
    <div class="post__buttons">
      <button @click="$emit('open-post', post.id)">Відкрити</button>
      <button @click="$emit('delete-post', post.id)">Видалити</button>
    </div>
  </div>
</template>

<style scoped>
.post {
  background: var(--color-white);
  border-radius: var(--border-radius);
  padding: 20px;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.post:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(46, 26, 71, 0.2);
}

.postDescription {
  margin-bottom: 15px;
}

.postDescription div {
  margin-bottom: 10px;
  line-height: 1.4;
}

.postDescription strong {
  color: var(--color-primary);
}

.post__buttons {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.post__buttons button {
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: var(--transition);
}

.post__buttons button:first-child {
  background: var(--color-primary);
  color: white;
}

.post__buttons button:first-child:hover {
  background: var(--color-secondary);
}

.post__buttons button:last-child {
  background: #f1f1f1;
  color: var(--color-text);
}

.post__buttons button:last-child:hover {
  background: #e0e0e0;
}
</style>

