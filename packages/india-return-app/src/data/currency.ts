export type CurrencyCode = 'INR' | 'USD' | 'GBP' | 'EUR' | 'AED' | 'CAD' | 'AUD' | 'SGD'

export interface CurrencyInfo {
    code: CurrencyCode
    label: string
    symbol: string
    /** Approximate INR per 1 unit of this currency — indicative 2025-26 rates, not live. */
    inrPerUnit: number
}

// Indicative rates only — for "does this number feel right" comparisons, not for actually
// transferring money. Check a live rate (Wise, XE, your bank) before making financial decisions.
export const currencies: CurrencyInfo[] = [
    { code: 'INR', label: 'Indian Rupee (₹)', symbol: '₹', inrPerUnit: 1 },
    { code: 'USD', label: 'US Dollar ($)', symbol: '$', inrPerUnit: 87 },
    { code: 'GBP', label: 'British Pound (£)', symbol: '£', inrPerUnit: 110 },
    { code: 'EUR', label: 'Euro (€)', symbol: '€', inrPerUnit: 95 },
    { code: 'AED', label: 'UAE Dirham (AED)', symbol: 'AED ', inrPerUnit: 23.7 },
    { code: 'CAD', label: 'Canadian Dollar (C$)', symbol: 'C$', inrPerUnit: 63 },
    { code: 'AUD', label: 'Australian Dollar (A$)', symbol: 'A$', inrPerUnit: 57 },
    { code: 'SGD', label: 'Singapore Dollar (S$)', symbol: 'S$', inrPerUnit: 65 }
]

export function getCurrency(code: CurrencyCode): CurrencyInfo {
    return currencies.find((c) => c.code === code) ?? currencies[0]
}
