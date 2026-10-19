import { useQuery } from '@tanstack/react-query'
import { fetchCurrencies } from '../api/currencies'

export function useCurrencies() {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    staleTime: Infinity,
  })
}
