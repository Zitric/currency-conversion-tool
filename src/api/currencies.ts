export const API_URL = '/api/v1'

export type Currency = {
  id: number
  name: string
  short_code: string
  symbol: string
}

type CurrenciesResponse = {
  response: Currency[]
}

export async function fetchCurrencies(): Promise<Currency[]> {
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_CURRENCY_BEACON_API_KEY}`,
  }

  const response = await fetch(`${API_URL}/currencies`, { headers })

  if (!response.ok) {
    throw new Error(`Failed to fetch currencies (${response.status})`)
  }

  const data: CurrenciesResponse = await response.json()
  return data.response
}
