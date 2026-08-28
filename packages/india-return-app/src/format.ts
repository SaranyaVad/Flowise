export function formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

export function formatLPA(amount: number): string {
    return `₹${(amount / 100000).toFixed(1)}L`
}

export function formatRangeINR(range: [number, number]): string {
    return `${formatINR(range[0])} – ${formatINR(range[1])}`
}

export function formatRangeLPA(range: [number, number]): string {
    return `${formatLPA(range[0])} – ${formatLPA(range[1])}`
}
