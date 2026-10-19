import type { Currency } from '../api/currencies'

type CurrencyListProps = {
  currencies: Currency[]
}

export function CurrencyList({ currencies }: CurrencyListProps) {
  return (
    <ul>
      {currencies.map(({ id, short_code, name }) => (
        <li key={id}>
          {short_code} — {name}
        </li>
      ))}
    </ul>
  )
}
