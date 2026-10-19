import { describe, expect, it } from 'vitest'
import { mockFetch } from '../test/mockFetch'
import { fetchConversion } from './convert'

const params = { from: 'USD', to: 'EUR', amount: 12.5 }

describe('fetchConversion', () => {
  it('returns the converted value', async () => {
    mockFetch({ response: { value: 11.15 } })

    expect(await fetchConversion(params)).toBe(11.15)
    expect(fetch).toHaveBeenCalledWith(
      '/api/v1/convert?from=USD&to=EUR&amount=12.5',
      expect.anything(),
    )
  })

  it('throws when the API fails', async () => {
    mockFetch(null, 401)

    await expect(fetchConversion(params)).rejects.toThrow(
      'Failed to convert currency (401)',
    )
  })
})
