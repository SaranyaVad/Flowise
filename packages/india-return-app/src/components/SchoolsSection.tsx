import { useMemo, useState } from 'react'
import { schools, schoolTierLabels, SchoolTier } from '../data/schools'
import { formatRangeINR } from '../format'

const tiers: (SchoolTier | 'all')[] = ['all', 'budget', 'mid', 'premium']

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
    const [tierFilter, setTierFilter] = useState<SchoolTier | 'all'>('all')
    const [board, setBoard] = useState<string>('all')

    const boards = useMemo(() => {
        const set = new Set<string>()
        schools.forEach((s) => s.boards.forEach((b) => set.add(b)))
        return ['all', ...Array.from(set).sort()]
    }, [])

    const filtered = schools.filter((s) => {
        if (tierFilter !== 'all' && s.tier !== tierFilter) return false
        if (board !== 'all' && !s.boards.includes(board)) return false
        return true
    })

    return (
        <section>
            <h2>Schools & Fees</h2>
            <p className='section-intro'>
                Annual tuition fee ranges for well-known schools in Hyderabad. Fees typically rise 8-10% a year and vary by
                grade/campus — confirm current figures with the school before committing. The rating shown is an informal
                reputation score aggregated from published rankings and parent-review sites — India has no single official
                inspection body (no Ofsted equivalent), so treat it as a rough signal, not an audited score.
            </p>
            <div className='filters'>
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
            </div>
            <div className='card-grid'>
                {filtered.map((s) => (
                    <div className='card' key={s.name}>
                        <h3>{s.name}</h3>
                        <p className='muted'>{s.area}</p>
                        <p>
                            <span className={`tag tag-${s.tier}`}>{schoolTierLabels[s.tier]}</span>
                        </p>
                        <p>
                            <StarRating score={s.reputationScore} />
                        </p>
                        <p className='muted small'>{s.reputationNote}</p>
                        <p>
                            <strong>Boards:</strong> {s.boards.join(', ')}
                        </p>
                        <p>
                            <strong>Annual tuition:</strong> {formatRangeINR(s.annualTuitionFeeINR)}
                        </p>
                        {s.oneTimeAdmissionINR && (
                            <p>
                                <strong>One-time admission:</strong> {formatRangeINR(s.oneTimeAdmissionINR)}
                            </p>
                        )}
                        {s.notes && <p className='muted'>{s.notes}</p>}
                    </div>
                ))}
            </div>
        </section>
    )
}
