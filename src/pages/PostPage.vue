<script>

import axios from "axios";
import AppLoader from "@/components/ui/AppLoader.vue";

export default {
  name: "PostPage",
  components: {AppLoader},
  data() {
    return {
      post: {
        id: '',
        title: '',
        body: ''
      },
      isLoading: false,
      back: true,
    }
  },
  computed: {
    getParamsId() {
      return this.$route.params.id;
    }
  },
  methods: {
    async fetchPost() {
      try {
        this.isLoading = true;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.getParamsId}`);
        this.post = response.data;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    this.fetchPost();
  }
}
</script>

<template>
  <app-loader v-if="isLoading"></app-loader>
  <div class="post-page" >
    <div class="breadcrumbs" v-if="back">
      <router-link to="/" class="back-link">
        <span class="arrow">←</span> Повернутися до списку постів
      </router-link>
    </div>
    <div class="post-container">
      <div class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">ID: {{ getParamsId }}</div>
      </div>

      <div class="post-content">
        <p>{{ post.body }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.post-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 20px;
  color: #333333;
}

.post-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(46, 26, 71, 0.1);
  padding: 30px;
}

.post-header {
  margin-bottom: 10px;
  border-bottom: 2px solid #F8F5FF;
}

.post-title {
  color: #2E1A47;
  font-size: 28px;
  margin: 0 0 10px 0;
  line-height: 1.3;
}

.post-meta {
  color: #777777;
  font-size: 14px;
}

.post-content {
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 30px;
}

.post-content p {
  margin: 0 0 20px 0;
}

.back-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: var(--color-primary);
  font-weight: 500;
  transition: color 0.2s ease;
}

.breadcrumbs {
  margin-bottom: 8px;
}


.back-link:hover {
  color: var(--color-secondary)
}

.arrow {
  margin-right: 5px;
  font-size: 1.2em;
}


@media (max-width: 768px) {
  .post-page {
    padding: 20px 15px;
  }

  .post-container {
    padding: 20px;
  }

  .post-title {
    font-size: 24px;
  }

  .post-content {
    font-size: 15px;
  }

  .post-actions {
    flex-direction: column;
    gap: 10px;
  }

  .action-btn {
    width: 100%;
    padding: 12px;
  }
}
</style>
