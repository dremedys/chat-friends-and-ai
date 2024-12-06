import { describe, it, expect } from 'vitest'
import { formatTimestamp } from './utils'

describe('formatTimestamp', () => {
  it('should format as HH:mm if today date', () => {
    const now = new Date()
    const timestamp = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 14, 55).toISOString()
    expect(formatTimestamp(timestamp)).toBe('14:55')
  })

  it('should return Yesterday for if yesterday', () => {
    const now = new Date()
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 14, 55).toISOString()
    expect(formatTimestamp(yesterday)).toBe('Yesterday')
  })

  it('should format as DD.MM.YYYY if before yesterday', () => {
    const timestamp = '2024-12-01T14:55:04.412Z'
    expect(formatTimestamp(timestamp)).toBe('01.12.2024')
  })

  it('should handle timestamp for very old time', () => {
    const timestamp = '2000-01-01T14:55:04.412Z'
    expect(formatTimestamp(timestamp)).toBe('01.01.2000')
  })
})
