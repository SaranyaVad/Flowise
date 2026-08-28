import { useState } from 'react'
import { seniorityLevels, trackLabels, Track } from '../data/salaries'
import { formatRangeLPA } from '../format'

const tracks: Track[] = ['tech-ic', 'tech-management', 'product', 'general-corporate']

export function SalariesSection() {
    const [track, setTrack] = useState<Track>('tech-ic')
    const rows = seniorityLevels.filter((s) => s.track === track)

    return (
        <section>
            <h2>Salaries & Seniority Levels</h2>
            <p className='section-intro'>
                Indicative 2025-26 total CTC (cost-to-company: base + target bonus + equity at grant) by seniority level in
                Hyderabad. Product-company figures skew toward large tech/product firms; IT services figures are for
                delivery-org roles at firms like TCS/Infosys/Wipro/Cognizant/Accenture. Actual offers vary by company, and
                base salary alone is usually well below the CTC figure at senior levels once bonus/equity are stripped out.
            </p>
            <div className='filters'>
                <label>
                    Track{' '}
                    <select value={track} onChange={(e) => setTrack(e.target.value as Track)}>
                        {tracks.map((t) => (
                            <option key={t} value={t}>
                                {trackLabels[t]}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            <div className='table-wrap'>
                <table>
                    <thead>
                        <tr>
                            <th>Level</th>
                            <th>Typical titles</th>
                            <th>Experience</th>
                            <th>IT services CTC</th>
                            <th>Product company CTC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.level}>
                                <td>
                                    <strong>{r.level}</strong>
                                </td>
                                <td className='muted'>{r.typicalTitles}</td>
                                <td>{r.yearsExperience}</td>
                                <td>{r.itServicesCtcLPA ? formatRangeLPA(r.itServicesCtcLPA) : '—'}</td>
                                <td>{formatRangeLPA(r.productCompanyCtcLPA)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {rows.some((r) => r.notes) && (
                <ul className='notes-list'>
                    {rows
                        .filter((r) => r.notes)
                        .map((r) => (
                            <li key={r.level} className='muted small'>
                                <strong>{r.level}:</strong> {r.notes}
                            </li>
                        ))}
                </ul>
            )}
        </section>
    )
}
