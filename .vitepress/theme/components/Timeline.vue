<script setup>
import { computed } from 'vue'
import { data as postsData } from '../../posts.data.js'

// 获取按月份分组的时间线数据
const timeline = computed(() => postsData.timeline)

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr
}
</script>

<template>
  <div class="timeline-page">
    <h1>📅 时间线</h1>
    <p class="subtitle">按时间顺序浏览所有文章</p>
    
    <div class="timeline">
      <div v-for="(posts, monthKey) in timeline" :key="monthKey" class="month-group">
        <h2 class="month-title">{{ monthKey }}</h2>
        <ul class="posts-list">
          <li v-for="post in posts" :key="post.url" class="post-item">
            <a :href="post.url" class="post-title">{{ post.title }}</a>
            <div class="post-meta">
              <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
              <span class="date">{{ formatDate(post.dateStr) }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.timeline-page h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.subtitle {
  color: var(--vp-c-text-2);
  margin-bottom: 40px;
}

.month-group {
  margin-bottom: 40px;
}

.month-title {
  font-size: 1.3rem;
  border-bottom: 2px solid var(--vp-c-divider);
  padding-bottom: 10px;
  margin-bottom: 20px;
  color: var(--vp-c-text-1);
}

.posts-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-title {
  color: var(--vp-c-brand);
  text-decoration: none;
  font-weight: 500;
  font-size: 1.05rem;
  display: block;
  margin-bottom: 8px;
}

.post-title:hover {
  text-decoration: underline;
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.tag {
  display: inline-block;
  padding: 2px 10px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.date {
  color: var(--vp-c-text-3);
  font-size: 13px;
  margin-left: auto;
}
</style>
