import { insights } from '../data/insights'

const SEE_ALSO_TAB: Record<string, string> = {
    'Schools & Fees': 'schools',
    'Rent vs Buy': 'housing',
    'Salaries & Seniority': 'salaries',
    'Lifestyle Calculator': 'calculator',
    'Moving Costs': 'movecosts'
}

export function InsightsSection({ onNavigate }: { onNavigate: (tab: string) => void }) {
    return (
        <section>
            <h2>Common Questions</h2>
            <p className='section-intro'>
                What people actually ask before moving back — themes pulled from NRI/expat community discussions (r/nri,
                r/developersIndia, r/FIRE_ind, TeamBlind's "Return to India" channel) rather than official guidance. Treat these
                as things to plan around, not universal truths — every move is different.
            </p>
            <div className='insight-list'>
                {insights.map((i) => (
                    <div className='insight-item' key={i.question}>
                        <h3>{i.question}</h3>
                        <p>{i.answer}</p>
                        {i.seeAlso && (
                            <button type='button' className='link-button' onClick={() => onNavigate(SEE_ALSO_TAB[i.seeAlso!])}>
                                See {i.seeAlso} →
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
