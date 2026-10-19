import { API_URL } from './util'

export type ConversionParams = {
  from: string
  to: string
  amount: number
}

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

  if (!response.ok) {
    throw new Error(`Failed to convert currency (${response.status})`)
  }

  const data: ConvertResponse = await response.json()
  return data.response.value
}
