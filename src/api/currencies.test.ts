import { describe, expect, it } from 'vitest'
import { mockFetch } from '../test/mockFetch'
import { type Currency, fetchCurrencies } from './currencies'

const currencies: Currency[] = [
  { id: 1, name: 'Euro', short_code: 'EUR', symbol: '€' },
]

describe('fetchCurrencies', () => {
  it('returns the currencies', async () => {
    mockFetch({ response: currencies })

    expect(await fetchCurrencies()).toEqual(currencies)
  })

  it('throws when the API fails', async () => {
    mockFetch(null, 401)

    await expect(fetchCurrencies()).rejects.toThrow(
      'Failed to fetch currencies (401)',
    )
  })
})
