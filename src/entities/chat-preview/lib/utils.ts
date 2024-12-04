import { GetMessageResponseDto } from '@/shared/types/message'

export function formatTimestamp(timestamp: GetMessageResponseDto['timestamp']): string {
  const date = new Date(timestamp)
  const now = new Date()

  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())

  const yesterdayStart = new Date(todayStart)
  yesterdayStart.setDate(todayStart.getDate() - 1)

  if (date >= todayStart) {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  } else if (date >= yesterdayStart && date < todayStart) {
    return 'Yesterday'
  } else {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
    const year = date.getFullYear()
    return `${day}.${month}.${year}`
  }
}
