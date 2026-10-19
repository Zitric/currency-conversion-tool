import { useId } from 'react'
import type { ConversionParams } from '../api/convert'
import { useConversion } from '../hooks/useConversion'

export function ConversionResult({ from, to, amount }: ConversionParams) {
  const id = useId()
  const {
    data: value,
    isLoading,
    isError,
    error,
  } = useConversion({
    from,
    to,
    amount,
  })

  function display() {
    if (isLoading) return 'Converting…'
    if (isError) return error.message
    if (value === undefined) return '—'
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: to,
    }).format(value)
  }

  return (
    <div className="field">
      <label htmlFor={id}>Converted amount</label>
      <output id={id} className={isError ? 'error' : undefined}>
        {display()}
      </output>
    </div>
  )
}
