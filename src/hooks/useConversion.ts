import { useQuery } from '@tanstack/react-query'
import type { ConversionParams } from '../api/convert'
import { fetchConversion } from '../api/convert'

export function useConversion({ from, to, amount }: ConversionParams) {
  return useQuery({
    queryKey: ['conversion', from, to, amount],
    queryFn: () => fetchConversion({ from, to, amount }),
    // Only call the API once the user has filled in the select boxes and entered a valid amount
    enabled: from !== '' && to !== '' && amount > 0,
  })
}
