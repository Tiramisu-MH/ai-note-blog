<script setup>
import { computed } from 'vue'
import { data as postsData } from '../../posts.data.js'

// 获取最新文章 (前5篇)
const latestPosts = computed(() => postsData.posts.slice(0, 5))

// 获取标签统计
const tags = computed(() => postsData.tags.slice(0, 8))
</script>

<template>
  <div class="home-content">
    <!-- 最新文章 -->
    <section class="latest-posts">
      <h2>📰 最新文章</h2>
      <ul>
        <li v-for="post in latestPosts" :key="post.url">
          <a :href="post.url">{{ post.title }}</a>
          <span class="date">{{ post.dateStr }}</span>
        </li>
      </ul>
    </section>

    <!-- 标签分类 -->
    <section class="tags-section">
      <h2>🏷️ 标签分类</h2>
      <div class="tags">
        <a 
          v-for="tag in tags" 
          :key="tag.name" 
          :href="`/tags/${tag.name}`"
          class="tag"
        >
          {{ tag.name }} · {{ tag.count }}篇
        </a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-content {
  padding: 20px 0;
}

.latest-posts {
  margin: 30px 0;
}

.latest-posts h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.latest-posts ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.latest-posts li {
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.latest-posts a {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
}

.latest-posts a:hover {
  text-decoration: underline;
}

.latest-posts .date {
  color: var(--vp-c-text-3);
  font-size: 13px;
  white-space: nowrap;
  margin-left: 15px;
}

.tags-section {
  margin: 40px 0;
}

.tags-section h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tags .tag {
  display: inline-block;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-radius: 20px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 14px;
  transition: all 0.2s;
}

.tags .tag:hover {
  background: var(--vp-c-brand);
  color: white;
}
</style>
