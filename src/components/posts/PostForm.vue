<script>

import AppInput from "@/components/ui/AppInput.vue";


export default {
  name: "PostForm",
  components: {MyInput: AppInput},
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  emits: ["create-post"],
  data() {
    return {
      post: {
        id: "",
        title:"",
        body: "",
      },
    }
  },
  methods: {
    createPost() {
      this.$emit('create-post', this.post);
      this.post = {id: "", title: "", body: ""};
    },
  },
}
</script>



<template>
    <form @submit.prevent>
      <MyInput type="text" placeholder="Назва" v-model="post.title" v-focus/>
      <MyInput type="text" placeholder="Опис" v-model="post.body" />
      <button @click="createPost" class="button">Створити</button>
    </form>
</template>



<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

h4 {
  color: var(--color-primary);
  margin-bottom: 10px;
  font-size: 1.3rem;
  text-align: center;
}

</style>
