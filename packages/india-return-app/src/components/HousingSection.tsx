import { useMemo, useState } from 'react'
import { localities, localityTierLabels, LocalityTier } from '../data/housing'
import { formatINR } from '../format'

const tiers: (LocalityTier | 'all')[] = ['all', 'budget', 'mid', 'premium']

export function HousingSection() {
    const [tierFilter, setTierFilter] = useState<LocalityTier | 'all'>('all')
    const [localityName, setLocalityName] = useState('all')

    const sortedNames = useMemo(() => [...localities.map((l) => l.name)].sort((a, b) => a.localeCompare(b)), [])

    const filtered = localities.filter((l) => {
        if (localityName !== 'all') return l.name === localityName
        if (tierFilter !== 'all' && l.tier !== tierFilter) return false
        return true
    })

    return (
        <section>
            <h2>Housing — Rent vs Buy</h2>
            <p className='section-intro'>
                Indicative 2025 rent and purchase prices by locality across the city — IT corridor, north, northeast, east, and
                the old city core. Actual numbers vary a lot by building age, floor and amenities — treat these as budgeting
                ranges, not quotes.
            </p>
            <div className='filters'>
                <label>
                    Locality{' '}
                    <select value={localityName} onChange={(e) => setLocalityName(e.target.value)}>
                        <option value='all'>All localities</option>
                        {sortedNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Tier{' '}
                    <select
                        value={tierFilter}
                        onChange={(e) => setTierFilter(e.target.value as LocalityTier | 'all')}
                        disabled={localityName !== 'all'}
                    >
                        {tiers.map((t) => (
                            <option key={t} value={t}>
                                {t === 'all' ? 'All' : localityTierLabels[t]}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <p className='muted small' style={{ marginTop: '-8px', marginBottom: '12px' }}>
                Showing {filtered.length} of {localities.length} localities
            </p>
            <div className='table-wrap'>
                <table>
                    <thead>
                        <tr>
                            <th>Locality</th>
                            <th>Known for</th>
                            <th>2BHK rent/mo</th>
                            <th>3BHK rent/mo</th>
                            <th>Buy price/sqft</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((l) => (
                            <tr key={l.name}>
                                <td>
                                    <strong>{l.name}</strong>
                                    <div>
                                        <span className={`tag tag-${l.tier}`}>{localityTierLabels[l.tier]}</span>
                                    </div>
                                </td>
                                <td className='muted'>{l.knownFor}</td>
                                <td>
                                    {formatINR(l.rentMonthlyINR.twoBHK[0])} – {formatINR(l.rentMonthlyINR.twoBHK[1])}
                                </td>
                                <td>
                                    {formatINR(l.rentMonthlyINR.threeBHK[0])} – {formatINR(l.rentMonthlyINR.threeBHK[1])}
                                </td>
                                <td>
                                    {formatINR(l.buyPricePerSqftINR[0])} – {formatINR(l.buyPricePerSqftINR[1])}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className='muted small'>
                Rule of thumb: a 1,400 sqft 3BHK at ₹9,000/sqft ≈ ₹1.26 Cr. With a typical 20% down payment and the rest as a
                home loan at ~8.5% over 20 years, the EMI on the loan portion works out to roughly ₹85,000–95,000/month.
            </p>
        </section>
    )
}
