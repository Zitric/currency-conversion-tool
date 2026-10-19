import { useId } from 'react'
import { useCurrencies } from '../hooks/useCurrencies'
import { CurrencyOptions } from './CurrencyOptions'

type CurrencySelectProps = {
  label: string
  value: string
  onChange: (currencyCode: string) => void
}

export function CurrencySelect({
  label,
  value,
  onChange,
}: CurrencySelectProps) {
  const id = useId()
  const { data: currencies, isPending, isError, error } = useCurrencies()

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {isError ? (
        <p role="alert" className="error">
          {error.message}
        </p>
      ) : (
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={isPending}
        >
          <option value="" disabled>
            {isPending ? 'Loading currencies…' : 'Select a currency'}
          </option>
          {currencies && <CurrencyOptions currencies={currencies} />}
        </select>
      )}
    </div>
  )
}
