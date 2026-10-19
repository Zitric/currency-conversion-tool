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

  if (isError) return <p role="alert">{error.message}</p>

  return (
    <>
      <label htmlFor={id}>{label}</label>
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
    </>
  )
}
