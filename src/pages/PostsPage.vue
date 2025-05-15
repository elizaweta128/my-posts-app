<script>
import PostForm from "@/components/posts/PostForm.vue";
import PostList from "../components/posts/PostList.vue";
import AppModal from "@/components/ui/AppModal.vue";
import axios from "axios";
import AppInput from "@/components/ui/AppInput.vue";
import AppLoader from "@/components/ui/AppLoader.vue";



export default {
  name: "PostsPage",
  components: {AppLoader, MyInput: AppInput, AppModal, PostForm, PostList},
  data() {
    return {
      posts: [],
      isLoading: false,
      selectedSort: "",
      sortOptions: [
        {value: "title", name: "По названию"},
        {value: "body", name: "По описанию"}
      ],
      searchQuery: "",
      page: 1,
      limit: 10,
      totalPages: 0,
      arrayOfPages: [],
      modal: false,
    }
  },
  mounted() {
    this.fetchPosts();
  },
  methods: {
    createPost(post) {
      this.posts.unshift({...post, id: this.posts[0] + 1});
      this.modal = false;
    },
    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
    },
    openPost(postId) {
      this.$router.push({ path: `/posts/${postId}` });
    },
    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = response.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async loadMorePosts() {
      try {
        this.isLoading = true;
        this.page += 1;
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers["x-total-count"] / this.limit);
        this.posts = [...this.posts, ...response.data];
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) => {
        return post.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      })
    }
  }
}


</script>

<template>
  <app-loader v-if="isLoading"></app-loader>
  <div class="posts-page">
    <h1>Список постів</h1>
    <div class="posts-controls">
      <MyInput
          type="text"
          v-model="searchQuery"
          placeholder="Пошук..."
          class="search-input"
      />
      <div class="controls-group">
        <button
            @click="modal = true"
            class="button"
        >
          Створити пост
        </button>
      </div>
    </div>
    <teleport to="body">
    <app-modal v-if="modal" @close="modal = false"
    >
      <PostForm @create-post="createPost" :posts="posts" />
    </app-modal>
    </teleport>
    <PostList
        :posts="sortedAndSearchedPosts"
        @delete-post="deletePost"
        @open-post="openPost"
        v-if="!isLoading"
    />
    <div v-else class="loading">Загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<style scoped>
.posts-page {
  padding: 10px;
  color: var(--color-text);
  display: flex;
  align-items: center;
  flex-direction: column;
}

h1 {
  color: var(--color-primary);
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.posts-controls {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
}

.controls-group {
  display: flex;
  gap: 15px;
}

.search-input {
  width: 100%;
  max-width: 500px;
}


.loading {
  text-align: center;
  font-size: 16px;
  color: var(--color-primary);
  padding: 30px;
}

.observer {
  height: 20px;
}
</style>
