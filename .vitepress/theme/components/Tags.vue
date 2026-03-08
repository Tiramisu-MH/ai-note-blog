<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vitepress'
import { data as postsData } from '../../posts.data.js'

const route = useRoute()
const currentTag = ref('')

// 从 URL 获取当前标签
onMounted(() => {
  const path = route.path
  if (path.startsWith('/tags/')) {
    currentTag.value = decodeURIComponent(path.replace('/tags/', ''))
  }
})

// 所有标签
const allTags = computed(() => postsData.tags)

// 当前标签的文章
const currentTagPosts = computed(() => {
  if (!currentTag.value) return []
  const tag = postsData.tags.find(t => t.name === currentTag.value)
  return tag ? tag.posts : []
})
</script>

<template>
  <div class="tags-page">
    <h1>🏷️ 标签</h1>
    
    <!-- 标签列表 -->
    <div v-if="!currentTag" class="tag-list">
      <p class="hint">选择标签查看对应文章</p>
      <div class="tags">
        <a 
          v-for="tag in allTags" 
          :key="tag.name" 
          :href="`/tags/${tag.name}`"
          class="tag"
        >
          {{ tag.name }} · {{ tag.count }}篇
        </a>
      </div>
    </div>
    
    <!-- 标签文章列表 -->
    <div v-else class="tag-posts">
      <div class="tag-header">
        <a href="/tags" class="back-link">← 返回标签列表</a>
        <h2>{{ currentTag }}</h2>
        <p class="count">{{ currentTagPosts.length }} 篇文章</p>
      </div>
      
      <ul class="posts-list">
        <li v-for="post in currentTagPosts" :key="post.url" class="post-item">
          <a :href="post.url" class="post-title">{{ post.title }}</a>
          <span class="date">{{ post.date }}</span>
        </li>
      </ul>
      
      <div v-if="currentTagPosts.length === 0" class="no-posts">
        暂无文章
      </div>
    </div>
  </div>
</template>

<style scoped>
.tags-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tags-page h1 {
  font-size: 2rem;
  margin-bottom: 30px;
}

.hint {
  color: var(--vp-c-text-2);
  margin-bottom: 20px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag {
  display: inline-block;
  padding: 10px 18px;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.tag:hover {
  background: var(--vp-c-brand);
  color: white;
}

.tag-header {
  margin-bottom: 30px;
}

.back-link {
  display: inline-block;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 15px;
}

.back-link:hover {
  text-decoration: underline;
}

.tag-header h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.count {
  color: var(--vp-c-text-2);
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.post-title {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.post-title:hover {
  text-decoration: underline;
}

.date {
  color: var(--vp-c-text-3);
  font-size: 13px;
  white-space: nowrap;
  margin-left: 15px;
}

.no-posts {
  color: var(--vp-c-text-2);
  padding: 40px 0;
  text-align: center;
}
</style>
