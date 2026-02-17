import DefaultTheme from 'vitepress/theme'
import { h, computed } from 'vue'
import { useData } from 'vitepress'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    const { frontmatter } = useData()
    
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
