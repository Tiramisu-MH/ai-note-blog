import { createContentLoader } from 'vitepress'

// 数据加载器：在构建时生成 posts.json
export default createContentLoader('posts/*.md', {
  includeSrc: false,
  transform(rawData) {
    // 按日期排序
    const posts = rawData.map(({ url, frontmatter }) => ({
      title: frontmatter.title,
      url: url.replace(/\.html$/, ''),
      date: frontmatter.date,
      dateStr: formatDate(frontmatter.date),
      year: getYear(frontmatter.date),
      month: getMonth(frontmatter.date),
      monthStr: getMonthStr(frontmatter.date),
      tags: frontmatter.tags || [],
      description: frontmatter.description || ''
    })).sort((a, b) => {
      const dateA = a.date ? new Date(a.date) : new Date(0)
      const dateB = b.date ? new Date(b.date) : new Date(0)
      return dateB - dateA
    })

    // 生成按月份分组的时间线数据
    const timeline = {}
    posts.forEach(post => {
      const key = `${post.year}年${post.monthStr}月`
      if (!timeline[key]) {
        timeline[key] = []
      }
      timeline[key].push(post)
    })

    // 生成标签统计数据
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

function formatDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '-')
}

function getYear(dateStr) {
  if (!dateStr) return '未知'
  return new Date(dateStr).getFullYear().toString()
}

function getMonth(dateStr) {
  if (!dateStr) return 0
  return new Date(dateStr).getMonth() + 1
}

function getMonthStr(dateStr) {
  if (!dateStr) return '未知'
  const month = new Date(dateStr).getMonth() + 1
  const monthNames = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  return monthNames[month - 1]
}
