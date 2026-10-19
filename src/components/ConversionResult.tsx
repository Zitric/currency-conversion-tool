import type { ConversionParams } from '../api/convert'
import { useConversion } from '../hooks/useConversion'

export function ConversionResult({ from, to, amount }: ConversionParams) {
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

  if (isLoading) return <p>Converting…</p>
  if (isError) return <p role="alert">{error.message}</p>
  if (value === undefined) return null

  return (
    <output>
      {new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: to,
      }).format(value)}
    </output>
  )
}
