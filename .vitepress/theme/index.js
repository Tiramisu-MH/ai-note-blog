import DefaultTheme from 'vitepress/theme'
import { h, ref, onMounted } from 'vue'
import { useData } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData()
    const sidebarCollapsed = ref(false)
    
    onMounted(() => {
      // 从 localStorage 读取保存的状态
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

    const formatDate = (dateStr) => {
      if (!dateStr) return new Date().toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '.')
      
      const date = new Date(dateStr)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(/\//g, '.')
    }

    return h(DefaultTheme.Layout, null, {
      'nav-bar-content-before': () => h('button', {
        class: 'sidebar-toggle',
        onClick: toggleSidebar,
        title: sidebarCollapsed.value ? '展开侧边栏' : '收起侧边栏'
      }, sidebarCollapsed.value ? '»' : '«'),
      'doc-after': () => {
        const date = frontmatter.value?.date
        return h('div', { class: 'post-timestamp' }, [
          h('span', { class: 'timestamp-label' }, '发布于 '),
          h('span', { class: 'timestamp-value' }, formatDate(date))
        ])
      }
    })
  }
}
