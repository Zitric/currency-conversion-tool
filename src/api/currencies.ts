const API_URL = '/api/v1'

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
  const res = await fetch(`${API_URL}/currencies`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_CURRENCY_BEACON_API_KEY}`,
    },
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch currencies (${res.status})`)
  }

  const data: CurrenciesResponse = await res.json()
  return data.response
}
