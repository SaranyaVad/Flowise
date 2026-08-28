import { useMemo, useState } from 'react'
import { lifestyleBaselines, LifestyleTier, CHILD_COST_MULTIPLIER, requiredCtcForTakeHome } from '../data/lifestyle'
import { localities, LocalityTier } from '../data/housing'
import { schools, SchoolTier } from '../data/schools'
import { average, calculateEmi } from '../calc'
import { formatINR, formatLPA } from '../format'

const CAR_MONTHLY_INR = 12000 // fuel + EMI/maintenance for one owned car, mid-segment sedan/SUV
const HOME_LOAN_RATE_PCT = 8.5
const HOME_LOAN_YEARS = 20
const HOME_LOAN_DOWN_PAYMENT_PCT = 20
const FLAT_SIZE_SQFT = { twoBHK: 1000, threeBHK: 1450 }
const SAVINGS_MARGIN = 1.2 // target take-home = expenses * this margin, to leave room for savings/emergencies

const LIFESTYLE_CATEGORY_LABELS: { key: keyof (typeof lifestyleBaselines)[number]['monthlyPerAdultINR']; label: string }[] = [
    { key: 'groceriesFood', label: 'Groceries & food' },
    { key: 'transport', label: 'Transport' },
    { key: 'utilitiesPhoneInternet', label: 'Utilities / phone / internet' },
    { key: 'healthcareInsurance', label: 'Healthcare / insurance' },
    { key: 'discretionaryLifestyle', label: 'Discretionary (dining, shopping, travel)' }
]

export function LifestyleCalculator() {
    const [adults, setAdults] = useState(2)
    const [kids, setKids] = useState(1)
    const [lifestyleTier, setLifestyleTier] = useState<LifestyleTier>('comfortable')
    const [schoolTier, setSchoolTier] = useState<SchoolTier>('mid')
    const [housingMode, setHousingMode] = useState<'rent' | 'buy'>('rent')
    const [localityTier, setLocalityTier] = useState<LocalityTier>('mid')
    const [wantsCar, setWantsCar] = useState(true)
    const [wantsHelp, setWantsHelp] = useState(true)
    const [showLifestyleDetail, setShowLifestyleDetail] = useState(false)

    const selectedBaseline = lifestyleBaselines.find((b) => b.tier === lifestyleTier)!
    const selectedBaselinePerAdultTotal = LIFESTYLE_CATEGORY_LABELS.reduce(
        (sum, c) => sum + selectedBaseline.monthlyPerAdultINR[c.key],
        0
    )

    const result = useMemo(() => {
        const baseline = lifestyleBaselines.find((b) => b.tier === lifestyleTier)!
        const perAdult = baseline.monthlyPerAdultINR
        const adultLiving =
            (perAdult.groceriesFood + perAdult.transport + perAdult.utilitiesPhoneInternet + perAdult.healthcareInsurance + perAdult.discretionaryLifestyle) *
            adults
        const kidLiving =
            (perAdult.groceriesFood + perAdult.healthcareInsurance + perAdult.discretionaryLifestyle) * CHILD_COST_MULTIPLIER * kids

        const matchingLocalities = localities.filter((l) => l.tier === localityTier)
        const bhkKey = adults + kids >= 3 ? 'threeBHK' : 'twoBHK'
        const avgRent =
            matchingLocalities.reduce((sum, l) => sum + average(l.rentMonthlyINR[bhkKey]), 0) / (matchingLocalities.length || 1)
        const avgPricePerSqft =
            matchingLocalities.reduce((sum, l) => sum + average(l.buyPricePerSqftINR), 0) / (matchingLocalities.length || 1)

        let housingMonthly: number
        let housingNote: string
        if (housingMode === 'rent') {
            housingMonthly = avgRent
            housingNote = `Avg ${bhkKey === 'threeBHK' ? '3BHK' : '2BHK'} rent in ${localityTier}-tier localities`
        } else {
            const size = FLAT_SIZE_SQFT[bhkKey]
            const price = size * avgPricePerSqft
            const loanPrincipal = price * (1 - HOME_LOAN_DOWN_PAYMENT_PCT / 100)
            housingMonthly = calculateEmi(loanPrincipal, HOME_LOAN_RATE_PCT, HOME_LOAN_YEARS)
            housingNote = `EMI on ~${size} sqft flat (~${formatINR(price)}, ${HOME_LOAN_DOWN_PAYMENT_PCT}% down, ${HOME_LOAN_RATE_PCT}% / ${HOME_LOAN_YEARS}yr)`
        }

        const matchingSchools = schools.filter((s) => s.tier === schoolTier)
        const avgAnnualFee = matchingSchools.reduce((sum, s) => sum + average(s.annualTuitionFeeINR), 0) / (matchingSchools.length || 1)
        const schoolingMonthly = kids > 0 ? (avgAnnualFee * kids) / 12 : 0

        const helpMonthly = wantsHelp ? baseline.domesticHelpMonthlyINR : 0
        const carMonthly = wantsCar ? CAR_MONTHLY_INR : 0

        const totalMonthly = adultLiving + kidLiving + housingMonthly + schoolingMonthly + helpMonthly + carMonthly
        const totalAnnual = totalMonthly * 12
        const targetAnnualTakeHome = totalAnnual * SAVINGS_MARGIN
        const requiredCtc = requiredCtcForTakeHome(targetAnnualTakeHome)

        return {
            adultLiving,
            kidLiving,
            housingMonthly,
            housingNote,
            schoolingMonthly,
            helpMonthly,
            carMonthly,
            totalMonthly,
            totalAnnual,
            targetAnnualTakeHome,
            targetMonthlyTakeHome: targetAnnualTakeHome / 12,
            requiredCtc,
            requiredMonthlyCtc: requiredCtc / 12
        }
    }, [adults, kids, lifestyleTier, schoolTier, housingMode, localityTier, wantsCar, wantsHelp])

    return (
        <section>
            <h2>Lifestyle Calculator</h2>
            <p className='section-intro'>
                Estimate a monthly budget and the monthly/annual salary you'd need to sustain it comfortably (target take-home
                = {SAVINGS_MARGIN}x expenses, leaving room for savings). All figures are Hyderabad-specific 2025-26 estimates —
                use them for planning, not as guarantees.
            </p>
            <div className='calc-grid'>
                <label>
                    Adults
                    <input type='number' min={1} max={4} value={adults} onChange={(e) => setAdults(Number(e.target.value))} />
                </label>
                <label>
                    School-age kids
                    <input type='number' min={0} max={4} value={kids} onChange={(e) => setKids(Number(e.target.value))} />
                </label>
                <label>
                    Lifestyle
                    <select value={lifestyleTier} onChange={(e) => setLifestyleTier(e.target.value as LifestyleTier)}>
                        {lifestyleBaselines.map((b) => (
                            <option key={b.tier} value={b.tier}>
                                {b.label}
                            </option>
                        ))}
                    </select>
                    <button type='button' className='link-button' onClick={() => setShowLifestyleDetail((v) => !v)}>
                        {showLifestyleDetail ? 'Hide' : 'What does this include?'}
                    </button>
                </label>
                <label>
                    School tier
                    <select value={schoolTier} onChange={(e) => setSchoolTier(e.target.value as SchoolTier)} disabled={kids === 0}>
                        <option value='budget'>Budget</option>
                        <option value='mid'>Mid-range</option>
                        <option value='premium'>Premium/International</option>
                    </select>
                </label>
                <label>
                    Housing
                    <select value={housingMode} onChange={(e) => setHousingMode(e.target.value as 'rent' | 'buy')}>
                        <option value='rent'>Rent</option>
                        <option value='buy'>Buy (home loan EMI)</option>
                    </select>
                </label>
                <label>
                    Locality tier
                    <select value={localityTier} onChange={(e) => setLocalityTier(e.target.value as LocalityTier)}>
                        <option value='budget'>Budget</option>
                        <option value='mid'>Mid-range</option>
                        <option value='premium'>Premium</option>
                    </select>
                </label>
                <label className='checkbox-label'>
                    <input type='checkbox' checked={wantsCar} onChange={(e) => setWantsCar(e.target.checked)} />
                    Own a car
                </label>
                <label className='checkbox-label'>
                    <input type='checkbox' checked={wantsHelp} onChange={(e) => setWantsHelp(e.target.checked)} />
                    Domestic help
                </label>
            </div>

            {showLifestyleDetail && (
                <div className='lifestyle-detail'>
                    <h4>{selectedBaseline.label} lifestyle — what's in it</h4>
                    <p className='muted small'>{selectedBaseline.description}</p>
                    <table className='breakdown'>
                        <tbody>
                            {LIFESTYLE_CATEGORY_LABELS.map((c) => (
                                <tr key={c.key}>
                                    <td>{c.label}</td>
                                    <td>{formatINR(selectedBaseline.monthlyPerAdultINR[c.key])}</td>
                                </tr>
                            ))}
                            <tr className='total-row'>
                                <td>Per adult, per month</td>
                                <td>{formatINR(selectedBaselinePerAdultTotal)}</td>
                            </tr>
                            <tr>
                                <td>Domestic help (household, if selected below)</td>
                                <td>{formatINR(selectedBaseline.domesticHelpMonthlyINR)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className='muted small'>
                        This is per-adult living cost only — housing, schooling, car and domestic help are added separately
                        below based on your other choices. A child is estimated at {Math.round(CHILD_COST_MULTIPLIER * 100)}% of
                        an adult's food/healthcare/discretionary spend (no transport/utilities), plus schooling if applicable.
                    </p>
                </div>
            )}

            <div className='result-card'>
                <h3>Estimated monthly budget</h3>
                <table className='breakdown'>
                    <tbody>
                        <tr>
                            <td>Adults' living costs</td>
                            <td>{formatINR(result.adultLiving)}</td>
                        </tr>
                        {kids > 0 && (
                            <tr>
                                <td>Kids' living costs</td>
                                <td>{formatINR(result.kidLiving)}</td>
                            </tr>
                        )}
                        <tr>
                            <td>
                                Housing ({housingMode === 'rent' ? 'rent' : 'EMI'})
                                <div className='muted small'>{result.housingNote}</div>
                            </td>
                            <td>{formatINR(result.housingMonthly)}</td>
                        </tr>
                        {kids > 0 && (
                            <tr>
                                <td>Schooling (amortized monthly)</td>
                                <td>{formatINR(result.schoolingMonthly)}</td>
                            </tr>
                        )}
                        {wantsHelp && (
                            <tr>
                                <td>Domestic help</td>
                                <td>{formatINR(result.helpMonthly)}</td>
                            </tr>
                        )}
                        {wantsCar && (
                            <tr>
                                <td>Car (fuel + EMI/upkeep)</td>
                                <td>{formatINR(result.carMonthly)}</td>
                            </tr>
                        )}
                        <tr className='total-row'>
                            <td>Total monthly</td>
                            <td>{formatINR(result.totalMonthly)}</td>
                        </tr>
                        <tr>
                            <td>Total annual</td>
                            <td>{formatINR(result.totalAnnual)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className='headline-result'>
                    <div>
                        <span className='label'>Target take-home (with {Math.round((SAVINGS_MARGIN - 1) * 100)}% savings margin)</span>
                        <span className='value'>{formatINR(result.targetMonthlyTakeHome)}/month</span>
                        <span className='sub-value'>{formatINR(result.targetAnnualTakeHome)}/year</span>
                    </div>
                    <div>
                        <span className='label'>Estimated CTC needed</span>
                        <span className='value big'>{formatINR(result.requiredMonthlyCtc)}/month</span>
                        <span className='sub-value'>
                            {formatINR(result.requiredCtc)}/year ({formatLPA(result.requiredCtc)})
                        </span>
                    </div>
                </div>
                <p className='muted small'>
                    CTC estimate accounts for income tax, PF and typical bonus/equity structure at that income level — it's a
                    planning estimate, not tax advice.
                </p>
            </div>
        </section>
    )
}
