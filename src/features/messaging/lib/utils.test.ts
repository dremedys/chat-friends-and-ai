import { describe, it, expect } from 'vitest'
import { getRandomNegativeInteger } from './utils'

describe('getRandomNegativeInteger', () => {
  it('should return a negative number', () => {
    const result = getRandomNegativeInteger()
    expect(result).toBeLessThan(0)
  })
})
