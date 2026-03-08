import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import { useData } from 'vitepress'
import { data as postsData } from '../posts.data.js'
import HomeContent from './components/HomeContent.vue'
import Timeline from './components/Timeline.vue'
import Tags from './components/Tags.vue'
import { formatPostDate } from './utils/postDate.js'
import './custom.css'

// 导出数据给全局使用
if (typeof window !== 'undefined') {
  window.__POSTS_DATA__ = postsData
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 将数据注入全局
    app.config.globalProperties.$postsData = postsData

    // 注册全局组件
    app.component('HomeContent', HomeContent)
    app.component('Timeline', Timeline)
    app.component('Tags', Tags)
  },
  Layout() {
    const { frontmatter } = useData()

    return h(DefaultTheme.Layout, null, {
      'doc-after': () => {
        const date = frontmatter.value?.date
        if (date) {
          return h('div', { class: 'post-timestamp' }, [
            h('span', { class: 'timestamp-label' }, '发布于 '),
            h('span', { class: 'timestamp-value' }, formatPostDate(date))
          ])
        }
        return null
      }
    })
  }
}

