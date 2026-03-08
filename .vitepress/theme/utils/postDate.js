const SHANGHAI_TIME_ZONE = 'Asia/Shanghai'
const SHANGHAI_LOCALE = 'sv-SE'

function pad(value) {
  return String(value).padStart(2, '0')
}

function isDateObject(value) {
  return Object.prototype.toString.call(value) === '[object Date]' && !Number.isNaN(value.getTime())
}

function formatAbsoluteDateToShanghai(date) {
  const formatter = new Intl.DateTimeFormat(SHANGHAI_LOCALE, {
    timeZone: SHANGHAI_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  const parts = Object.fromEntries(
    formatter.formatToParts(date)
      .filter(part => part.type !== 'literal')
      .map(part => [part.type, part.value])
  )

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}:${parts.second}`
}

export function normalizePostDate(input) {
  if (!input) return null

  if (isDateObject(input)) {
    const shanghai = formatAbsoluteDateToShanghai(input)
    return buildNormalizedDate(shanghai)
  }

  const raw = String(input).trim()
  if (!raw) return null

  const naiveMatch = raw.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/)
  if (naiveMatch) {
    const [, year, month, day, hour, minute, second] = naiveMatch
    return buildNormalizedDate(`${year}-${month}-${day} ${hour}:${minute}:${second}`)
  }

  const absolute = new Date(raw)
  if (!Number.isNaN(absolute.getTime())) {
    const shanghai = formatAbsoluteDateToShanghai(absolute)
    return buildNormalizedDate(shanghai)
  }

  return null
}

function buildNormalizedDate(ymdhms) {
  const match = ymdhms.match(/^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/)
  if (!match) return null

  const [, year, month, day, hour, minute, second] = match
  const timestamp = Date.UTC(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour) - 8,
    Number(minute),
    Number(second)
  )

  return {
    raw: ymdhms,
    timestamp,
    year: Number(year),
    month: Number(month),
    day: Number(day),
    hour: Number(hour),
    minute: Number(minute),
    second: Number(second),
    dateOnly: `${year}-${month}-${day}`,
    display: `${year}.${month}.${day} ${hour}:${minute}:${second}`,
    displayDateOnly: `${year}-${month}-${day}`,
    monthKey: `${year}年${getChineseMonth(Number(month))}月`
  }
}

function getChineseMonth(month) {
  return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'][month - 1] || '未知'
}

export function formatPostDate(input, { withTime = true } = {}) {
  const normalized = normalizePostDate(input)
  if (!normalized) return ''
  return withTime ? normalized.display : normalized.displayDateOnly
}

export function comparePostDatesDesc(a, b) {
  const left = normalizePostDate(a)
  const right = normalizePostDate(b)
  return (right?.timestamp ?? 0) - (left?.timestamp ?? 0)
}
