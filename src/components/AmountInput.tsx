import { useId } from 'react'

type AmountInputProps = {
  value: string
  onChange: (amount: string) => void
}

export function AmountInput({ value, onChange }: AmountInputProps) {
  const id = useId()

  return (
    <div className="field">
      <label htmlFor={id}>Amount</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        step="any"
        placeholder="0.00"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
