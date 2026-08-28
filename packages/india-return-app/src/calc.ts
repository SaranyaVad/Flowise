export function calculateEmi(principalINR: number, annualRatePct: number, years: number): number {
    const monthlyRate = annualRatePct / 100 / 12
    const n = years * 12
    if (monthlyRate === 0) return principalINR / n
    return (principalINR * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
}

export function average(range: [number, number]): number {
    return (range[0] + range[1]) / 2
}
