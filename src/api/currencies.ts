import { API_URL, assertOk } from './util'

export type Currency = {
  id: number
  name: string
  short_code: string
  symbol: string
}

// The API also repeats the list at the top level as "0", "1", "2"… keys.
// We read `response` because it's the main data node and a real array.
type CurrenciesResponse = {
  response: Currency[]
}

export async function fetchCurrencies(): Promise<Currency[]> {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_CURRENCY_BEACON_API_KEY}`,
  }

  const response = await fetch(`${API_URL}/currencies`, { headers })

  assertOk(response, 'Failed to fetch currencies')

  const data: CurrenciesResponse = await response.json()
  return data.response
}
