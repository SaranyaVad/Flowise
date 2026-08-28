import { createContext, useContext, useMemo, useState, ReactNode } from 'react'
import { CurrencyCode, currencies, getCurrency } from './data/currency'
import { formatINR, formatRangeINR, formatLPA } from './format'

interface CurrencyContextValue {
    currency: CurrencyCode
    setCurrency: (c: CurrencyCode) => void
    isForeign: boolean
    formatMoney: (inr: number) => string
    formatMoneyRange: (range: [number, number]) => string
    formatSalary: (inr: number) => string
    formatSalaryRange: (range: [number, number]) => string
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

function formatMoneyInCurrency(inr: number, code: CurrencyCode): string {
    if (code === 'INR') return formatINR(inr)
    const info = getCurrency(code)
    const converted = inr / info.inrPerUnit
    return info.symbol + converted.toLocaleString('en-US', { maximumFractionDigits: 0 })
}

function formatMoneyRangeInCurrency(range: [number, number], code: CurrencyCode): string {
    if (code === 'INR') return formatRangeINR(range)
    if (range[0] === range[1]) return formatMoneyInCurrency(range[0], code)
    return `${formatMoneyInCurrency(range[0], code)} – ${formatMoneyInCurrency(range[1], code)}`
}

function formatSalaryInCurrency(inr: number, code: CurrencyCode): string {
    if (code === 'INR') return formatLPA(inr)
    return formatMoneyInCurrency(inr, code)
}

function formatSalaryRangeInCurrency(range: [number, number], code: CurrencyCode): string {
    if (range[0] === range[1]) return formatSalaryInCurrency(range[0], code)
    return `${formatSalaryInCurrency(range[0], code)} – ${formatSalaryInCurrency(range[1], code)}`
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<CurrencyCode>('INR')

    const value = useMemo<CurrencyContextValue>(
        () => ({
            currency,
            setCurrency,
            isForeign: currency !== 'INR',
            formatMoney: (inr: number) => formatMoneyInCurrency(inr, currency),
            formatMoneyRange: (range: [number, number]) => formatMoneyRangeInCurrency(range, currency),
            formatSalary: (inr: number) => formatSalaryInCurrency(inr, currency),
            formatSalaryRange: (range: [number, number]) => formatSalaryRangeInCurrency(range, currency)
        }),
        [currency]
    )

    return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
}

export function useCurrency(): CurrencyContextValue {
    const ctx = useContext(CurrencyContext)
    if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider')
    return ctx
}

export { currencies }
