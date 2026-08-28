export function calculateEmi(principalINR: number, annualRatePct: number, years: number): number {
    const monthlyRate = annualRatePct / 100 / 12
    const n = years * 12
    if (monthlyRate === 0) return principalINR / n
    return (principalINR * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
}

export function average(range: [number, number]): number {
    return (range[0] + range[1]) / 2
}

export function distanceKm(a: [number, number], b: [number, number]): number {
    const R = 6371
    const dLat = ((b[0] - a[0]) * Math.PI) / 180
    const dLng = ((b[1] - a[1]) * Math.PI) / 180
    const lat1 = (a[0] * Math.PI) / 180
    const lat2 = (b[0] * Math.PI) / 180
    const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}
