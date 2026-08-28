import { useMemo, useState } from 'react'
import { localities, localityTierLabels, LocalityTier } from '../data/housing'
import { formatINR } from '../format'
import { calculateEmi, average } from '../calc'
import { useCurrency } from '../CurrencyContext'

const tiers: (LocalityTier | 'all')[] = ['all', 'budget', 'mid', 'premium']

export function HousingSection() {
    const { formatMoney } = useCurrency()
    const [tierFilter, setTierFilter] = useState<LocalityTier | 'all'>('all')
    const [localityName, setLocalityName] = useState('all')

    const sortedNames = useMemo(() => [...localities.map((l) => l.name)].sort((a, b) => a.localeCompare(b)), [])

    const filtered = localities.filter((l) => {
        if (localityName !== 'all') return l.name === localityName
        if (tierFilter !== 'all' && l.tier !== tierFilter) return false
        return true
    })

    const overallAvgSqft = useMemo(() => localities.reduce((s, l) => s + average(l.buyPricePerSqftINR), 0) / localities.length, [])

    const [sizeSqft, setSizeSqft] = useState(1400)
    const [pricePerSqft, setPricePerSqft] = useState(Math.round(overallAvgSqft))
    const [downPaymentPct, setDownPaymentPct] = useState(20)
    const [interestRatePct, setInterestRatePct] = useState(8.5)
    const [tenureYears, setTenureYears] = useState(20)

    const suggestedPricePerSqft = useMemo(() => {
        if (filtered.length === 0) return overallAvgSqft
        return filtered.reduce((s, l) => s + average(l.buyPricePerSqftINR), 0) / filtered.length
    }, [filtered, overallAvgSqft])

    const totalPrice = sizeSqft * pricePerSqft
    const loanAmount = totalPrice * (1 - downPaymentPct / 100)
    const monthlyEmi = calculateEmi(loanAmount, interestRatePct, tenureYears)
    const totalPayment = monthlyEmi * tenureYears * 12
    const totalInterest = totalPayment - loanAmount

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
                                    {formatMoney(l.rentMonthlyINR.twoBHK[0])} – {formatMoney(l.rentMonthlyINR.twoBHK[1])}
                                </td>
                                <td>
                                    {formatMoney(l.rentMonthlyINR.threeBHK[0])} – {formatMoney(l.rentMonthlyINR.threeBHK[1])}
                                </td>
                                <td>
                                    {formatMoney(l.buyPricePerSqftINR[0])} – {formatMoney(l.buyPricePerSqftINR[1])}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='calc-group'>
                <h4>EMI calculator</h4>
                <div className='calc-grid'>
                    <label>
                        Flat size (sqft)
                        <input type='number' min={300} step={50} value={sizeSqft} onChange={(e) => setSizeSqft(Number(e.target.value))} />
                    </label>
                    <label>
                        Price per sqft (₹)
                        <input
                            type='number'
                            min={1000}
                            step={100}
                            value={pricePerSqft}
                            onChange={(e) => setPricePerSqft(Number(e.target.value))}
                        />
                        <button type='button' className='link-button' onClick={() => setPricePerSqft(Math.round(suggestedPricePerSqft))}>
                            Use average for current selection ({formatINR(Math.round(suggestedPricePerSqft))})
                        </button>
                    </label>
                    <label>
                        Down payment %
                        <input
                            type='number'
                            min={0}
                            max={90}
                            value={downPaymentPct}
                            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Interest rate %
                        <input
                            type='number'
                            min={1}
                            max={20}
                            step={0.1}
                            value={interestRatePct}
                            onChange={(e) => setInterestRatePct(Number(e.target.value))}
                        />
                    </label>
                    <label>
                        Tenure (years)
                        <input type='number' min={1} max={30} value={tenureYears} onChange={(e) => setTenureYears(Number(e.target.value))} />
                    </label>
                </div>
                <table className='breakdown' style={{ marginTop: '12px' }}>
                    <tbody>
                        <tr>
                            <td>Total price</td>
                            <td>{formatMoney(totalPrice)}</td>
                        </tr>
                        <tr>
                            <td>Down payment</td>
                            <td>{formatMoney(totalPrice - loanAmount)}</td>
                        </tr>
                        <tr>
                            <td>Loan amount</td>
                            <td>{formatMoney(loanAmount)}</td>
                        </tr>
                        <tr className='total-row'>
                            <td>Monthly EMI</td>
                            <td>{formatMoney(monthlyEmi)}</td>
                        </tr>
                        <tr>
                            <td>Total interest over {tenureYears} years</td>
                            <td>{formatMoney(totalInterest)}</td>
                        </tr>
                        <tr>
                            <td>Total repaid (loan + interest)</td>
                            <td>{formatMoney(totalPayment)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}
