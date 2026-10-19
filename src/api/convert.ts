import { API_URL, assertOk } from './util'

export type ConversionParams = {
  from: string
  to: string
  amount: number
}

// The API also repeats these fields at the top level (value, date…).
// We read `response` because it's the main data node, same as /currencies.
type ConvertResponse = {
  response: { value: number }
}

export async function fetchConversion({
  from,
  to,
  amount,
}: ConversionParams): Promise<number> {
  const params = new URLSearchParams({ from, to, amount: String(amount) })
  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_CURRENCY_BEACON_API_KEY}`,
  }
  const response = await fetch(`${API_URL}/convert?${params}`, { headers })

  assertOk(response, 'Failed to convert currency')

  const data: ConvertResponse = await response.json()
  return data.response.value
}
