import { createContentLoader } from 'vitepress'
import { comparePostDatesDesc, normalizePostDate } from './theme/utils/postDate.js'

// 数据加载器：在构建时生成 posts.json
export default createContentLoader('posts/*.md', {
  includeSrc: false,
  transform(rawData) {
    const posts = rawData
      .map(({ url, frontmatter }) => {
        const normalizedDate = normalizePostDate(frontmatter.date)

        return {
          title: frontmatter.title,
          url: '/ai-note-blog' + url,
          date: normalizedDate?.raw || '',
          dateStr: normalizedDate?.display || '',
          dateOnly: normalizedDate?.displayDateOnly || '',
          timestamp: normalizedDate?.timestamp || 0,
          year: normalizedDate ? String(normalizedDate.year) : '未知',
          month: normalizedDate?.month || 0,
          monthStr: normalizedDate ? normalizedDate.monthKey.replace(/^\d{4}年|月$/g, '') : '未知',
          tags: frontmatter.tags || [],
          description: frontmatter.description || ''
        }
      })
      .sort((a, b) => comparePostDatesDesc(a.date, b.date))

    const timeline = {}
    posts.forEach(post => {
      const key = post.year === '未知' ? '未知' : `${post.year}年${post.monthStr}月`
      if (!timeline[key]) {
        timeline[key] = []
      }
      timeline[key].push(post)
    })

    const tags = {}
    posts.forEach(post => {
      post.tags.forEach(tag => {
        if (!tags[tag]) {
          tags[tag] = { name: tag, count: 0, posts: [] }
        }
        tags[tag].count++
        tags[tag].posts.push({
          title: post.title,
          url: post.url,
          date: post.dateStr
        })
      })
    })

    return {
      posts,
      timeline,
      tags: Object.values(tags).sort((a, b) => b.count - a.count)
    }
  }
})
