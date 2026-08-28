import { useMemo, useState } from 'react'
import { schools, schoolTierLabels, schoolStrengthLabels, SchoolTier, SchoolStrength } from '../data/schools'
import { localities } from '../data/housing'
import { distanceKm } from '../calc'
import { useCurrency } from '../CurrencyContext'

const tiers: (SchoolTier | 'all')[] = ['all', 'budget', 'mid', 'premium']
const radiusOptions = [2, 5, 10, 15, 20, 30]
const ratingOptions = [4.5, 4, 3.5, 3]
const allStrengths = Object.keys(schoolStrengthLabels) as SchoolStrength[]

function StarRating({ score }: { score: number }) {
    const full = Math.floor(score)
    const half = score - full >= 0.5
    const empty = 5 - full - (half ? 1 : 0)
    return (
        <span className='stars' aria-label={`${score} out of 5`}>
            {'★'.repeat(full)}
            {half ? '⯨' : ''}
            {'☆'.repeat(empty)}
            <span className='stars-score'>{score.toFixed(1)}</span>
        </span>
    )
}

export function SchoolsSection() {
    const { formatMoneyRange } = useCurrency()
    const [tierFilter, setTierFilter] = useState<SchoolTier | 'all'>('all')
    const [board, setBoard] = useState<string>('all')
    const [query, setQuery] = useState('')
    const [nearLocality, setNearLocality] = useState('all')
    const [radiusKm, setRadiusKm] = useState(10)
    const [minRating, setMinRating] = useState(0)
    const [strengthFilter, setStrengthFilter] = useState<SchoolStrength | 'all'>('all')

    const boards = useMemo(() => {
        const set = new Set<string>()
        schools.forEach((s) => s.boards.forEach((b) => set.add(b)))
        return ['all', ...Array.from(set).sort()]
    }, [])

    const sortedLocalityNames = useMemo(() => [...localities.map((l) => l.name)].sort((a, b) => a.localeCompare(b)), [])

    const referenceCoords = useMemo(
        () => (nearLocality === 'all' ? null : localities.find((l) => l.name === nearLocality)?.coordinates ?? null),
        [nearLocality]
    )

    const filtered = schools
        .filter((s) => {
            if (tierFilter !== 'all' && s.tier !== tierFilter) return false
            if (board !== 'all' && !s.boards.includes(board)) return false
            if (query && !`${s.name} ${s.area}`.toLowerCase().includes(query.toLowerCase())) return false
            if (referenceCoords && distanceKm(referenceCoords, s.coordinates) > radiusKm) return false
            if (minRating > 0 && s.reputationScore < minRating) return false
            if (strengthFilter !== 'all' && !s.strengths.includes(strengthFilter)) return false
            return true
        })
        .sort((a, b) => {
            if (!referenceCoords) return 0
            return distanceKm(referenceCoords, a.coordinates) - distanceKm(referenceCoords, b.coordinates)
        })

    return (
        <section>
            <h2>Schools & Fees</h2>
            <p className='section-intro'>
                Annual tuition fee ranges for well-known schools in Hyderabad. Fees typically rise 8-10% a year and vary by
                grade/campus — confirm current figures with the school before committing. The rating is an informal reputation
                score, and strengths/outcomes are general characterizations, not audited statistics — India has no Ofsted
                equivalent and no single centralized results database like the UK's exam league tables or "Oxbridge %"
                metric, so most schools don't publish batch-level results. Ask the school directly for real numbers.
            </p>
            <div className='filters'>
                <label>
                    Search{' '}
                    <input
                        type='text'
                        placeholder='School or area name…'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </label>
                <label>
                    Tier{' '}
                    <select value={tierFilter} onChange={(e) => setTierFilter(e.target.value as SchoolTier | 'all')}>
                        {tiers.map((t) => (
                            <option key={t} value={t}>
                                {t === 'all' ? 'All' : schoolTierLabels[t]}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Board{' '}
                    <select value={board} onChange={(e) => setBoard(e.target.value)}>
                        {boards.map((b) => (
                            <option key={b} value={b}>
                                {b === 'all' ? 'All' : b}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Min rating{' '}
                    <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
                        <option value={0}>Any</option>
                        {ratingOptions.map((r) => (
                            <option key={r} value={r}>
                                {r.toFixed(1)}+ ★
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Good at{' '}
                    <select value={strengthFilter} onChange={(e) => setStrengthFilter(e.target.value as SchoolStrength | 'all')}>
                        <option value='all'>Anything</option>
                        {allStrengths.map((s) => (
                            <option key={s} value={s}>
                                {schoolStrengthLabels[s]}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Near{' '}
                    <select value={nearLocality} onChange={(e) => setNearLocality(e.target.value)}>
                        <option value='all'>Anywhere</option>
                        {sortedLocalityNames.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Within{' '}
                    <select
                        value={radiusKm}
                        onChange={(e) => setRadiusKm(Number(e.target.value))}
                        disabled={nearLocality === 'all'}
                    >
                        {radiusOptions.map((km) => (
                            <option key={km} value={km}>
                                {km} km
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <p className='muted small' style={{ marginTop: '-8px', marginBottom: '16px' }}>
                Showing {filtered.length} of {schools.length} schools
            </p>
            <div className='card-grid'>
                {filtered.map((s) => (
                    <div className='card' key={s.name}>
                        <h3>{s.name}</h3>
                        <p className='muted'>{s.area}</p>
                        <p>
                            <span className={`tag tag-${s.tier}`}>{schoolTierLabels[s.tier]}</span>
                            {referenceCoords && (
                                <span className='muted small' style={{ marginLeft: '8px' }}>
                                    {distanceKm(referenceCoords, s.coordinates).toFixed(1)} km from {nearLocality}
                                </span>
                            )}
                        </p>
                        <p>
                            <StarRating score={s.reputationScore} />
                        </p>
                        <p className='muted small'>{s.reputationNote}</p>
                        <p>
                            <strong>Boards:</strong> {s.boards.join(', ')}
                        </p>
                        <p>
                            <strong>Annual tuition:</strong> {formatMoneyRange(s.annualTuitionFeeINR)}
                        </p>
                        {s.oneTimeAdmissionINR && (
                            <p>
                                <strong>One-time admission:</strong> {formatMoneyRange(s.oneTimeAdmissionINR)}
                            </p>
                        )}
                        {s.notes && <p className='muted'>{s.notes}</p>}
                        <p className='card-strengths'>
                            {s.strengths.map((st) => (
                                <span key={st} className='tag tag-strength'>
                                    {schoolStrengthLabels[st]}
                                </span>
                            ))}
                        </p>
                        <p>
                            <strong>Extracurriculars:</strong> {s.extracurriculars.join(', ')}
                        </p>
                        <p className='muted small'>
                            <strong>Outcomes:</strong> {s.outcomeHighlight}
                        </p>
                        <p className='muted small'>
                            <strong>Extra fees:</strong> {s.extraFeesNote}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
