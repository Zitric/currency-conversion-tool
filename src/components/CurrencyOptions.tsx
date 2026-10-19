import type { Currency } from '../api/currencies'

type CurrencyOptionsProps = {
  currencies: Currency[]
}

export function CurrencyOptions({ currencies }: CurrencyOptionsProps) {
  return currencies.map(({ id, short_code, name }) => (
    <option key={id} value={short_code}>
      {short_code} — {name}
    </option>
  ))
}
