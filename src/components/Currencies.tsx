import { useCurrencies } from '../hooks/useCurrencies'
import { CurrencyList } from './CurrencyList'

export function Currencies() {
  const { data: currencies, isPending, isError, error } = useCurrencies()

  if (isPending) return <p>Loading currencies…</p>
  if (isError) return <p role="alert">{error.message}</p>

  return <CurrencyList currencies={currencies} />
}
