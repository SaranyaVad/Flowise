export type SchoolTier = 'budget' | 'mid' | 'premium'

export type SchoolStrength =
    | 'Academics'
    | 'JEE/NEET Prep'
    | 'Global University Placement'
    | 'Sports'
    | 'Arts & Culture'
    | 'STEM & Robotics'
    | 'Leadership & Communication'

export const schoolStrengthLabels: Record<SchoolStrength, string> = {
    Academics: 'Academics',
    'JEE/NEET Prep': 'JEE/NEET Prep',
    'Global University Placement': 'Global University Placement',
    Sports: 'Sports',
    'Arts & Culture': 'Arts & Culture',
    'STEM & Robotics': 'STEM & Robotics',
    'Leadership & Communication': 'Leadership & Communication'
}

export interface School {
    name: string
    area: string
    boards: string[]
    tier: SchoolTier
    annualTuitionFeeINR: [number, number]
    oneTimeAdmissionINR?: [number, number]
    notes?: string
    /** Approximate [lat, lng] of the area/campus — for map placement, not an exact street address. */
    coordinates: [number, number]
    /**
     * Informal reputation score (1-5), aggregated from published rankings, "best schools" lists and
     * parent-review aggregators (EzySchooling, Yellow Slate, Education Today's ICSE survey, etc).
     * India has no single official inspection body (no Ofsted equivalent) — treat this as a rough
     * signal of standing, not an audited rating.
     */
    reputationScore: number
    reputationNote: string
    /** What the school is generally known for — a rough categorical signal, not a ranked score. */
    strengths: SchoolStrength[]
    /** Typical activities on offer. Actual clubs/teams vary by year and campus. */
    extracurriculars: string[]
    /**
     * A qualitative note on outcomes (exam results, university placement, etc). India has no
     * centralized public results database like the UK's exam league tables or a single "Oxbridge %"
     * style metric, and most schools don't publish audited batch-level results — so this is a
     * general characterization, not a verified statistic. Ask the school directly for real numbers.
     */
    outcomeHighlight: string
    /** Typical extra costs beyond tuition for activities/sports/electives — indicative, not a quote. */
    extraFeesNote: string
}

export const CITY = 'Hyderabad'

// ---- Tier-level defaults ----
// Most schools within a tier share a broadly similar activities/outcomes profile and India has no
// centralized, audited per-school results database to differentiate them further — so schools without
// a specific, sourced distinguishing fact use these defaults rather than invented specifics. Schools
// with genuinely known distinguishing characteristics (see individual entries below) override them.
const budgetDefaults = {
    strengths: ['Academics', 'JEE/NEET Prep'] as SchoolStrength[],
    extracurriculars: ['Cricket / basketball', 'NCC / Scouts & Guides', 'Annual cultural day', 'Yoga & fitness'],
    outcomeHighlight:
        'Exam-focused pedagogy oriented toward strong board results and JEE/NEET pipelines; batch-level results are not independently published.',
    extraFeesNote: 'Sports/activity fees are typically modest and often bundled into tuition — ask about transport and lab fees separately.'
}

const midDefaults = {
    strengths: ['Academics', 'Sports', 'Arts & Culture'] as SchoolStrength[],
    extracurriculars: ['Basketball / cricket academy', 'Music (instrumental/vocal)', 'Dance', 'Debate & MUN', 'Robotics & coding club'],
    outcomeHighlight:
        'Balanced academics-plus-activities profile typical of established CBSE/ICSE schools; consistent board results without a single published ranking.',
    extraFeesNote: 'Sports coaching, music/dance electives and transport are usually billed separately — roughly ₹5,000–15,000/year on top of tuition.'
}

const premiumDefaults = {
    strengths: ['Global University Placement', 'Arts & Culture', 'Sports', 'STEM & Robotics'] as SchoolStrength[],
    extracurriculars: ['Swimming', 'Robotics & coding lab', 'Debate & MUN', 'Music conservatory', 'Drama & theatre', 'Multiple sports academies'],
    outcomeHighlight:
        'University counselling geared toward global placements (US/UK/India); IB average scores and destination lists are usually shared only with enrolled families, not published.',
    extraFeesNote:
        'Specialised programs (competitive sports academies, music conservatories, overseas trips) often carry substantial fees on top of tuition — commonly ₹30,000–1,00,000+/year.'
}

// Fee figures are annual tuition only (2025-26 indicative), gathered from public fee
// structures, school websites and parent-reported ranges. Actual fees vary by grade,
// campus and change ~8-10% year on year — always confirm with the school directly.
export const schools: School[] = [
    {
        name: 'Delhi Public School (DPS), Hyderabad',
        area: 'Nacharam / Khajaguda / Miyapur (multiple campuses)',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [178500, 250500],
        oneTimeAdmissionINR: [5000, 25000],
        notes: 'Fee rises through grades; Class XI/XII stream fees are at the top of the range.',
        coordinates: [17.4227, 78.546],
        reputationScore: 4,
        reputationNote: 'Well-established national CBSE brand; consistent academic track record across campuses.',
        ...midDefaults,
        strengths: ['Academics', 'Sports', 'Leadership & Communication'],
        extracurriculars: ['Athletics & inter-house sports', 'National-level debate/quiz circuits', 'Music & dance', 'NCC', 'Robotics club']
    },
    {
        name: 'Glendale Academy',
        area: 'Rajendranagar',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [150000, 280000],
        coordinates: [17.3313, 78.4108],
        reputationScore: 4,
        reputationNote: 'Franklin Covey "Lighthouse School" — recognised for leadership-focused curriculum.',
        ...midDefaults,
        strengths: ['Leadership & Communication', 'Academics', 'Arts & Culture'],
        extracurriculars: ["Franklin Covey 'Leader in Me' program", 'Public speaking & MUN', 'Student council/leadership roles', 'Music', 'Sports'],
        outcomeHighlight: "Built around Franklin Covey's leadership curriculum alongside CBSE/IGCSE academics — distinct emphasis on soft-skills development, not just exam scores."
    },
    {
        name: 'CHIREC International School',
        area: 'Kondapur / Gachibowli / Manikonda / Financial District (multiple campuses)',
        boards: ['CBSE', 'IB', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [80000, 300000],
        notes: 'IB/IGCSE campuses and senior grades sit at the top of the range.',
        coordinates: [17.4615, 78.3676],
        reputationScore: 4.5,
        reputationNote: 'Ranked #1 Ivy League Day School; the default top pick for IT-corridor families.',
        strengths: ['Global University Placement', 'STEM & Robotics', 'Academics'],
        extracurriculars: ['Robotics & coding (strong STEM emphasis)', 'Model UN', 'Sports academies', 'Music & theatre', 'Community service'],
        outcomeHighlight: 'Strong university counselling and STEM/robotics program; specific placement statistics are not independently published, but it is the most cited IT-corridor choice for global-track families.',
        extraFeesNote: 'IB/IGCSE campuses and specialised STEM programs carry higher activity fees than the CBSE campuses — confirm per-campus.'
    },
    {
        name: 'Oakridge International School',
        area: 'Gachibowli / Bachupally',
        boards: ['IB', 'ICSE'],
        tier: 'premium',
        annualTuitionFeeINR: [500000, 1000000],
        oneTimeAdmissionINR: [300000, 900000],
        notes: 'One of the priciest in the city; one-time admission/refundable deposit can run several lakh on top of tuition.',
        coordinates: [17.4401, 78.3489],
        reputationScore: 4.5,
        reputationNote: 'Long-running IB pedigree with a strong global university placement track record.',
        ...premiumDefaults,
        outcomeHighlight: 'One of the longer-running IB programs in the city with a consistently cited global university placement track record (US/UK/India); exact IB average scores are not publicly released.'
    },
    {
        name: 'The Aga Khan Academy',
        area: 'Hyderabad',
        boards: ['IB'],
        tier: 'premium',
        annualTuitionFeeINR: [600000, 950000],
        notes: 'Boarding option available; day-scholar fee is lower than boarding.',
        coordinates: [17.4491, 78.6558],
        reputationScore: 4.5,
        reputationNote: 'Highly selective, part of a small global network of Aga Khan IB academies.',
        strengths: ['Global University Placement', 'Leadership & Communication', 'Arts & Culture'],
        extracurriculars: ['Residential/boarding community life', 'Debate & Model UN', 'Community service programme', 'Visual & performing arts', 'Sports'],
        outcomeHighlight: 'Highly selective admissions and a global scholar network geared toward top international university placement; part of a small worldwide network of Aga Khan Academies with shared IB standards.',
        extraFeesNote: 'Boarding fees are substantially higher than day-scholar fees; ask for a full boarding cost breakdown separately from tuition.'
    },
    {
        name: 'Global Indian International School (GIIS)',
        area: 'Gachibowli',
        boards: ['CBSE', 'IB'],
        tier: 'premium',
        annualTuitionFeeINR: [250000, 500000],
        coordinates: [17.438, 78.351],
        reputationScore: 4,
        reputationNote: 'Solid CBSE/IB option backed by a large international school network.',
        ...premiumDefaults,
        strengths: ['Global University Placement', 'STEM & Robotics', 'Sports']
    },
    {
        name: 'Meridian School',
        area: 'Banjara Hills / Gachibowli / Kukatpally / Nizampet (multiple campuses)',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [90000, 190000],
        coordinates: [17.4156, 78.4347],
        reputationScore: 3.5,
        reputationNote: 'Consistent, well-regarded CBSE choice across several city campuses.',
        ...midDefaults
    },
    {
        name: 'Silver Oaks International School',
        area: 'Bachupally / Financial District',
        boards: ['CBSE', 'ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [120000, 260000],
        coordinates: [17.5237, 78.3714],
        reputationScore: 3.5,
        reputationNote: 'Growing reputation with newer, well-equipped campuses.',
        ...midDefaults
    },
    {
        name: 'Manthan International School',
        area: 'Kismatpur',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [130000, 220000],
        coordinates: [17.3559, 78.3702],
        reputationScore: 3.5,
        reputationNote: 'Well-regarded mid-size CBSE school with a loyal local following.',
        ...midDefaults
    },
    {
        name: 'Sri Chaitanya / Narayana / other CBSE day schools',
        area: 'City-wide',
        boards: ['CBSE', 'State Board'],
        tier: 'budget',
        annualTuitionFeeINR: [40000, 120000],
        notes: 'Widely available budget-to-mid option; academically intensive, exam-focused pedagogy.',
        coordinates: [17.385, 78.4867],
        reputationScore: 3,
        reputationNote: 'Strong exam results, but parent reviews are mixed on workload and student well-being.',
        ...budgetDefaults,
        outcomeHighlight: 'The closest thing Hyderabad has to a JEE/NEET "feeder school" reputation — widely chosen specifically for competitive-exam prep integrated into the school day, at the cost of a demanding schedule and less extracurricular breadth.'
    },

    // ---- Premium (IB / international) ----
    {
        name: 'Indus International School',
        area: 'Shankarpally',
        boards: ['IB'],
        tier: 'premium',
        annualTuitionFeeINR: [700000, 1100000],
        coordinates: [17.423, 78.142],
        reputationScore: 4.5,
        reputationNote: "One of India's most established IB boarding+day schools; strong global university placement.",
        ...premiumDefaults,
        extracurriculars: ['Boarding house/community life', 'Extensive sports academies', 'Robotics & coding lab', 'Debate & MUN', 'Performing arts'],
        outcomeHighlight: "One of India's longest-running IB boarding schools; consistently cited for global university placement, though exact IB average scores/destination breakdowns are not publicly released."
    },
    {
        name: 'The Gaudium School',
        area: 'Kompally',
        boards: ['IB'],
        tier: 'premium',
        annualTuitionFeeINR: [350000, 650000],
        coordinates: [17.541, 78.489],
        reputationScore: 4,
        reputationNote: 'Well-regarded IB school anchoring the growing Kompally corridor.',
        ...premiumDefaults
    },
    {
        name: 'Sreenidhi International School',
        area: 'Ghatkesar',
        boards: ['IB', 'IGCSE'],
        tier: 'premium',
        annualTuitionFeeINR: [280000, 550000],
        coordinates: [17.446, 78.679],
        reputationScore: 4,
        reputationNote: 'Large campus with a strong STEM/university-prep reputation.',
        ...premiumDefaults,
        strengths: ['STEM & Robotics', 'Global University Placement', 'Sports']
    },
    {
        name: 'Meluha International School',
        area: 'Kokapet',
        boards: ['CBSE', 'IBCP'],
        tier: 'premium',
        annualTuitionFeeINR: [300000, 600000],
        coordinates: [17.402, 78.328],
        reputationScore: 4,
        reputationNote: 'Newer premium campus in the fast-growing Kokapet belt.',
        ...premiumDefaults
    },
    {
        name: 'Johnson Grammar School (IBDP campus)',
        area: 'Mallapur',
        boards: ['IB', 'ICSE'],
        tier: 'premium',
        annualTuitionFeeINR: [300000, 550000],
        coordinates: [17.457, 78.547],
        reputationScore: 4.5,
        reputationNote: 'ICSE campus independently ranked #1 in Telangana; the IBDP wing adds a premium option.',
        ...premiumDefaults,
        strengths: ['Academics', 'Global University Placement', 'Arts & Culture'],
        outcomeHighlight: 'The ICSE campus has been independently ranked #1 in Telangana in published school-ranking surveys — one of the few Hyderabad schools with a citable third-party academic ranking; the newer IBDP wing extends this toward global university placement.'
    },
    {
        name: 'Kairos International School',
        area: 'Kompally',
        boards: ['IB'],
        tier: 'premium',
        annualTuitionFeeINR: [320000, 600000],
        coordinates: [17.548, 78.479],
        reputationScore: 3.5,
        reputationNote: 'Newer IB entrant serving the northern suburbs.',
        ...premiumDefaults
    },
    {
        name: 'Westbrook International School',
        area: 'Kompally',
        boards: ['IGCSE'],
        tier: 'premium',
        annualTuitionFeeINR: [280000, 520000],
        coordinates: [17.543, 78.485],
        reputationScore: 3.5,
        reputationNote: 'Cambridge-curriculum option in the Kompally cluster.',
        ...premiumDefaults
    },
    {
        name: 'Sagebrook International School',
        area: 'Adibatla',
        boards: ['IGCSE', 'IB'],
        tier: 'premium',
        annualTuitionFeeINR: [300000, 550000],
        coordinates: [17.245, 78.551],
        reputationScore: 3.5,
        reputationNote: 'Serves the Adibatla aerospace/industrial corridor south-east of the city.',
        ...premiumDefaults
    },
    {
        name: 'Epistemo Vikas Leadership School',
        area: 'Kondapur',
        boards: ['IB'],
        tier: 'premium',
        annualTuitionFeeINR: [280000, 500000],
        coordinates: [17.465, 78.37],
        reputationScore: 3.5,
        reputationNote: 'IB option in the well-established Kondapur belt.',
        ...premiumDefaults,
        strengths: ['Leadership & Communication', 'Global University Placement', 'Arts & Culture']
    },
    {
        name: 'Suchitra Academy',
        area: 'Chandanagar',
        boards: ['CBSE', 'Cambridge'],
        tier: 'premium',
        annualTuitionFeeINR: [200000, 400000],
        coordinates: [17.501, 78.339],
        reputationScore: 3.5,
        reputationNote: 'Dual CBSE/Cambridge track in the northwestern suburbs.',
        ...premiumDefaults
    },

    // ---- Mid-range (established CBSE/ICSE) ----
    {
        name: 'Hyderabad Public School, Begumpet',
        area: 'Begumpet',
        boards: ['ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [90000, 180000],
        coordinates: [17.443, 78.465],
        reputationScore: 4.5,
        reputationNote: "One of India's oldest and most storied schools; historic prestige despite moderate fees.",
        ...midDefaults,
        strengths: ['Academics', 'Sports', 'Leadership & Communication'],
        extracurriculars: ['Large sports grounds/athletics', 'Prominent alumni network', 'Debate & literary societies', 'NCC', 'Music & drama'],
        outcomeHighlight: 'Historic reputation for producing prominent alumni across public life and academia; more valued for legacy/network prestige than for published exam-topper counts.'
    },
    {
        name: 'Nasr School',
        area: 'Red Hills / Nampally',
        boards: ['ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [70000, 140000],
        coordinates: [17.418, 78.453],
        reputationScore: 4,
        reputationNote: 'Long-established, well-regarded ICSE school in the city centre.',
        ...midDefaults
    },
    {
        name: "Bharatiya Vidya Bhavan's Public School",
        area: 'Sainikpuri',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [80000, 140000],
        coordinates: [17.488, 78.559],
        reputationScore: 4,
        reputationNote: "Exceptional cost-quality ratio; long-running Bhavan's-network reputation.",
        ...midDefaults,
        strengths: ['Academics', 'Arts & Culture', 'Sports']
    },
    {
        name: "St. Ann's High School",
        area: 'Malakpet',
        boards: ['ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [60000, 130000],
        coordinates: [17.38, 78.498],
        reputationScore: 3.5,
        reputationNote: 'Established convent-run ICSE school in the old city area.',
        ...midDefaults
    },
    {
        name: 'Gitanjali Senior School',
        area: 'Begumpet',
        boards: ['ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [100000, 160000],
        coordinates: [17.439, 78.461],
        reputationScore: 3.5,
        reputationNote: 'Well-regarded central ICSE option.',
        ...midDefaults
    },
    {
        name: 'The Premia Academy',
        area: 'Attapur',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [180000, 320000],
        coordinates: [17.38, 78.429],
        reputationScore: 3.5,
        reputationNote: 'Growing dual-curriculum school in the southern suburbs.',
        ...midDefaults
    },
    {
        name: 'Vikas The Concept School',
        area: 'Bachupally',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [90000, 170000],
        coordinates: [17.524, 78.365],
        reputationScore: 3.5,
        reputationNote: 'Popular CBSE choice for northwestern families.',
        ...midDefaults
    },
    {
        name: 'Sreenidhi Vidyalaya',
        area: 'Kukatpally',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [80000, 150000],
        coordinates: [17.49, 78.402],
        reputationScore: 3.5,
        reputationNote: 'Established, exam-focused CBSE school.',
        ...midDefaults,
        strengths: ['Academics', 'JEE/NEET Prep', 'Sports']
    },
    {
        name: 'Birla Open Minds International School',
        area: 'Kollur / Nanakramguda',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [180000, 320000],
        coordinates: [17.426, 78.301],
        reputationScore: 3.5,
        reputationNote: '15:1 student-teacher ratio; well-regarded newer campus.',
        ...midDefaults
    },
    {
        name: 'Pallavi International School',
        area: 'Gopanpally',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [150000, 280000],
        coordinates: [17.467, 78.323],
        reputationScore: 3.5,
        reputationNote: 'Part of a well-known local school network.',
        ...midDefaults
    },
    {
        name: 'Nalanda Vidya Niketan',
        area: 'Vanasthalipuram',
        boards: ['CBSE', 'ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [70000, 130000],
        coordinates: [17.34, 78.557],
        reputationScore: 3,
        reputationNote: 'Solid mid-range option for the southeastern suburbs.',
        ...midDefaults
    },
    {
        name: 'Manchester Global School',
        area: 'Attapur',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [180000, 300000],
        coordinates: [17.381, 78.428],
        reputationScore: 3.5,
        reputationNote: 'Newer dual-curriculum entrant in the southern belt.',
        ...midDefaults
    },
    {
        name: 'Global Edge School',
        area: 'Miyapur',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [90000, 160000],
        coordinates: [17.495, 78.366],
        reputationScore: 4,
        reputationNote: 'Recognised as a leading CBSE choice in the Miyapur belt.',
        ...midDefaults
    },
    {
        name: 'Sancta Maria International School',
        area: 'Chandanagar',
        boards: ['CBSE', 'IGCSE'],
        tier: 'mid',
        annualTuitionFeeINR: [130000, 240000],
        coordinates: [17.487, 78.32],
        reputationScore: 3.5,
        reputationNote: 'Well-regarded dual-curriculum school in the northwest.',
        ...midDefaults
    },
    {
        name: 'Delhi Public School, Nadergul',
        area: 'Nadergul',
        boards: ['CBSE'],
        tier: 'mid',
        annualTuitionFeeINR: [130000, 210000],
        coordinates: [17.306, 78.533],
        reputationScore: 3.5,
        reputationNote: 'Southern DPS campus serving the Nadergul/LB Nagar belt.',
        ...midDefaults,
        strengths: ['Academics', 'Sports', 'Leadership & Communication']
    },
    {
        name: 'St. Francis College / School',
        area: 'Begumpet',
        boards: ['ICSE'],
        tier: 'mid',
        annualTuitionFeeINR: [70000, 130000],
        coordinates: [17.443, 78.465],
        reputationScore: 3.5,
        reputationNote: 'Long-running, convent-run ICSE institution.',
        ...midDefaults
    },

    // ---- Budget ----
    {
        name: 'Bhashyam Educational Institutions (Sri Rama Krishna Vidyalaya)',
        area: 'Sainikpuri',
        boards: ['CBSE', 'State Board'],
        tier: 'budget',
        annualTuitionFeeINR: [35000, 90000],
        coordinates: [17.488, 78.559],
        reputationScore: 3.5,
        reputationNote: "22-acre campus; one of the state's best-known budget CBSE networks.",
        ...budgetDefaults,
        outcomeHighlight: "One of Telangana's most recognised budget networks specifically for academic/exam-prep intensity — widely chosen by families prioritising board and competitive-exam results over campus extras."
    },
    {
        name: 'Vidyaranya High School',
        area: 'Saifabad',
        boards: ['State Board', 'CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [20000, 60000],
        coordinates: [17.402, 78.465],
        reputationScore: 3,
        reputationNote: 'Long-running, very affordable central option.',
        ...budgetDefaults
    },
    {
        name: 'Kendriya Vidyalaya (various campuses)',
        area: 'Multiple (govt township/cantonment areas)',
        boards: ['CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [10000, 30000],
        coordinates: [17.446, 78.501],
        reputationScore: 3.5,
        reputationNote: 'Central-government school network; very low fees, consistent CBSE outcomes.',
        ...budgetDefaults,
        strengths: ['Academics', 'Sports'],
        outcomeHighlight: 'A large, standardised national network (run for central-government employee families) with consistent CBSE curriculum delivery; per-campus results vary and are not centrally published.'
    },
    {
        name: 'DAV Public School',
        area: 'Vidyanagar',
        boards: ['CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [45000, 100000],
        coordinates: [17.402, 78.509],
        reputationScore: 3.5,
        reputationNote: 'Well-known national CBSE network with several Hyderabad campuses.',
        ...budgetDefaults,
        strengths: ['Academics', 'Sports']
    },
    {
        name: 'Ryan International School',
        area: 'Nizampet',
        boards: ['CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [70000, 140000],
        coordinates: [17.509, 78.38],
        reputationScore: 3,
        reputationNote: 'National chain school serving the northwestern suburbs.',
        ...budgetDefaults,
        strengths: ['Academics', 'Arts & Culture', 'Sports']
    },
    {
        name: 'Little Flower High School',
        area: 'Uppal',
        boards: ['State Board', 'CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [25000, 60000],
        coordinates: [17.401, 78.559],
        reputationScore: 3,
        reputationNote: 'Affordable, well-established eastern-suburb option.',
        ...budgetDefaults
    },
    {
        name: 'Keys High School',
        area: 'Secunderabad',
        boards: ['ICSE', 'IGCSE'],
        tier: 'budget',
        annualTuitionFeeINR: [45000, 100000],
        coordinates: [17.453, 78.498],
        reputationScore: 3,
        reputationNote: 'Budget-friendly dual-curriculum school in the twin city.',
        ...budgetDefaults,
        strengths: ['Academics', 'Arts & Culture']
    },
    {
        name: 'Central Public School',
        area: 'Dilsukhnagar',
        boards: ['CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [40000, 90000],
        coordinates: [17.369, 78.525],
        reputationScore: 3,
        reputationNote: 'Popular affordable option in the busy Dilsukhnagar belt.',
        ...budgetDefaults
    },
    {
        name: 'Pallavi Model School',
        area: 'Kukatpally',
        boards: ['State Board', 'CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [30000, 70000],
        coordinates: [17.485, 78.405],
        reputationScore: 3,
        reputationNote: 'Budget option in the well-established Kukatpally belt.',
        ...budgetDefaults
    },
    {
        name: 'Slate International School',
        area: 'LB Nagar',
        boards: ['CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [45000, 100000],
        coordinates: [17.346, 78.553],
        reputationScore: 3,
        reputationNote: 'Newer, affordable option serving the eastern suburbs.',
        ...budgetDefaults,
        strengths: ['Academics', 'Arts & Culture']
    },
    {
        name: 'Vignana Bharathi School',
        area: 'Kukatpally',
        boards: ['State Board', 'CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [30000, 70000],
        coordinates: [17.493, 78.398],
        reputationScore: 3,
        reputationNote: 'Long-running, exam-focused budget school.',
        ...budgetDefaults
    },
    {
        name: 'Sri Sri Academy',
        area: 'Kompally',
        boards: ['CBSE'],
        tier: 'budget',
        annualTuitionFeeINR: [40000, 90000],
        coordinates: [17.539, 78.482],
        reputationScore: 3,
        reputationNote: 'Affordable CBSE option in the growing Kompally corridor.',
        ...budgetDefaults
    },
    {
        name: 'Abhyasa International Residential School',
        area: 'Adibatla',
        boards: ['ICSE', 'State Board'],
        tier: 'budget',
        annualTuitionFeeINR: [40000, 100000],
        coordinates: [17.24, 78.56],
        reputationScore: 3,
        reputationNote: 'Fully residential option serving the southeastern industrial belt.',
        ...budgetDefaults,
        strengths: ['Academics', 'Leadership & Communication'],
        extracurriculars: ['Residential/boarding community life', 'Cricket / basketball', 'NCC', 'Annual cultural day'],
        extraFeesNote: 'Boarding/residential fees are billed separately from tuition — confirm the full residential cost breakdown.'
    },
    {
        name: 'Narayana / Sri Chaitanya IIT-JEE feeder campuses',
        area: 'Madhapur / Kukatpally (multiple campuses)',
        boards: ['CBSE', 'State Board'],
        tier: 'budget',
        annualTuitionFeeINR: [45000, 110000],
        coordinates: [17.449, 78.391],
        reputationScore: 3,
        reputationNote: 'Exam-intensive, coaching-integrated schools; strong results, demanding schedules.',
        ...budgetDefaults,
        extracurriculars: ['Integrated JEE/NEET coaching (in place of most electives)', 'Limited sports periods', 'Annual cultural day'],
        outcomeHighlight: "Built specifically around integrated JEE/NEET coaching — the clearest 'exam-results-first' option in the city, at the direct cost of extracurricular breadth and free time."
    }
]

export const schoolTierLabels: Record<SchoolTier, string> = {
    budget: 'Budget (₹0.4–1.2L/yr)',
    mid: 'Mid-range CBSE/ICSE (₹0.8–3L/yr)',
    premium: 'Premium IB/international (₹2.5–10L/yr)'
}
