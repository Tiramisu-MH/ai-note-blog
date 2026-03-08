import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'
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
    const sidebarCollapsed = ref(false)

    onMounted(() => {
      const saved = localStorage.getItem('sidebar-collapsed')
      if (saved === 'true') {
        sidebarCollapsed.value = true
        document.documentElement.classList.add('sidebar-collapsed')
      }
    })

    const toggleSidebar = () => {
      sidebarCollapsed.value = !sidebarCollapsed.value
      document.documentElement.classList.toggle('sidebar-collapsed')
      localStorage.setItem('sidebar-collapsed', sidebarCollapsed.value)
    }

    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h('button', {
        class: 'sidebar-toggle',
        onClick: toggleSidebar,
        title: sidebarCollapsed.value ? '展开侧边栏' : '收起侧边栏'
      }, sidebarCollapsed.value ? '»' : '«'),
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
