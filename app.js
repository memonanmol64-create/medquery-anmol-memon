/**
 * MedQuery AI - Main Application Logic
 */

// Mock Database of Medical Topics and BCQs
const mockDatabase = {
    "cardiac cycle": [
        {
            id: 'q1',
            question: "Which phase of the cardiac cycle is characterized by the closure of the AV valves and the opening of the semilunar valves?",
            options: ["Atrial systole", "Isovolumetric contraction", "Ventricular ejection", "Isovolumetric relaxation"],
            answer: 2, // 0-indexed (Ventricular ejection)
            explanation: "Isovolumetric contraction ends and ventricular ejection begins when the pressure in the ventricles exceeds that in the aorta and pulmonary trunk, causing the semilunar valves to open. The AV valves closed previously during isovolumetric contraction.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        },
        {
            id: 'q2',
            question: "The first heart sound (S1) is primarily produced by the closing of which valves?",
            options: ["Aortic and pulmonary", "Mitral and tricuspid", "Mitral and aortic", "Tricuspid and pulmonary"],
            answer: 1,
            explanation: "S1 (the 'lub' sound) is caused by the sudden closure of the atrioventricular (mitral and tricuspid) valves at the beginning of ventricular systole.",
            difficulty: "Basic",
            diffColor: "text-green-600 bg-green-50 border-green-200"
        },
        {
            id: 'q3',
            question: "During which phase of the cardiac cycle is ventricular volume at its highest?",
            options: ["End of isovolumetric contraction", "End of atrial systole", "Peak of ventricular ejection", "End of isovolumetric relaxation"],
            answer: 1,
            explanation: "Ventricular volume is highest at the end of diastole (End-Diastolic Volume, EDV), which occurs immediately after atrial systole and right before isovolumetric contraction begins.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        },
        {
            id: 'q4',
            question: "A rapidly rising left ventricular pressure while left ventricular volume remains constant defines which phase?",
            options: ["Isovolumetric contraction", "Rapid ventricular ejection", "Isovolumetric relaxation", "Rapid ventricular filling"],
            answer: 0,
            explanation: "During isovolumetric contraction, the ventricles contract with all valves closed. Because blood cannot exit or enter, volume remains constant while pressure increases rapidly.",
            difficulty: "Basic",
            diffColor: "text-green-600 bg-green-50 border-green-200"
        },
        {
            id: 'q5',
            question: "The 'v wave' of the jugular venous pulse corresponds to which event in the cardiac cycle?",
            options: ["Atrial contraction", "Bulging of the tricuspid valve into the atrium", "Passive atrial filling against a closed tricuspid valve", "Opening of the tricuspid valve"],
            answer: 2,
            explanation: "The v wave reflects the steady increase in right atrial pressure due to venous return filling the atrium while the tricuspid valve is closed during ventricular systole.",
            difficulty: "Advanced",
            diffColor: "text-rose-600 bg-rose-50 border-rose-200"
        }
    ],
    "renal physiology": [
        {
            id: 'rq1',
            question: "In the nephron, where does the majority of glucose reabsorption occur?",
            options: ["Proximal convoluted tubule (PCT)", "Loop of Henle", "Distal convoluted tubule (DCT)", "Collecting duct"],
            answer: 0,
            explanation: "Under normal physiological conditions, almost 100% of filtered glucose is reabsorbed in the proximal convoluted tubule via SGLT2 and SGLT1 cotransporters.",
            difficulty: "Basic",
            diffColor: "text-green-600 bg-green-50 border-green-200"
        },
        {
            id: 'rq2',
            question: "Which segment of the loop of Henle is impermeable to water but actively reabsorbs NaCl?",
            options: ["Descending thin limb", "Ascending thin limb", "Thick ascending limb (TAL)", "Medullary collecting duct"],
            answer: 2,
            explanation: "The thick ascending limb (TAL) actively reabsorbs Na+, K+, and Cl- via the Na-K-2Cl cotransporter but is impermeable to water. This dilutes the tubular fluid.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        },
        {
            id: 'rq3',
            question: "Aldosterone primarily exerts its effects on which part of the nephron?",
            options: ["Proximal tubule", "Thick ascending limb", "Early distal tubule", "Late distal tubule and collecting duct"],
            answer: 3,
            explanation: "Aldosterone acts on the principal cells of the late distal tubule and collecting duct to increase Na+ reabsorption and K+ secretion via upregulation of ENaC channels.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        },
        {
            id: 'rq4',
            question: "What is the primary stimulus for the secretion of Renin from juxtaglomerular cells?",
            options: ["Increased afferent arteriolar stretch", "Decreased NaCl delivery to the macula densa", "Decreased sympathetic nerve activity", "Hyperkalemia"],
            answer: 1,
            explanation: "Renin secretion is stimulated by decreased perfusion pressure (less stretch), decreased NaCl delivery to the macula densa, and increased sympathetic nervous system activity.",
            difficulty: "Advanced",
            diffColor: "text-rose-600 bg-rose-50 border-rose-200"
        },
        {
            id: 'rq5',
            question: "In calculating renal clearance, if a substance is freely filtered and neither reabsorbed nor secreted, its clearance is equal to:",
            options: ["Renal Plasma Flow (RPF)", "Glomerular Filtration Rate (GFR)", "Renal Blood Flow (RBF)", "Filtration Fraction (FF)"],
            answer: 1,
            explanation: "Inulin is the classic substance that fits this description. Because it is filtered but not modified by the tubules, its clearance rate exactly equals the GFR.",
            difficulty: "Basic",
            diffColor: "text-green-600 bg-green-50 border-green-200"
        }
    ],
    "neuroanatomy": [
        {
            id: 'nq1',
            question: "A lesion in Broca's area (inferior frontal gyrus) typically results in:",
            options: ["Fluent, nonsensical speech", "Non-fluent, effortful speech with intact comprehension", "Inability to repeat spoken words", "Complete blindness"],
            answer: 1,
            explanation: "Broca's aphasia is an expressive aphasia. Patients have severe difficulty producing speech (non-fluent) but generally understand what is said to them.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        }
    ],
    "lower limb": [
        {
            id: 'll1_grays',
            bookRefs: ['gray', 'grays', 'gray\'s anatomy', 'anatomy'],
            question: "Which muscle is the primary extensor of the knee joint according to regional anatomical definitions?",
            options: ["Biceps femoris", "Quadriceps femoris", "Gastrocnemius", "Sartorius"],
            answer: 1,
            explanation: "The quadriceps femoris is universally described in comprehensive texts like Gray's Anatomy as the primary extensor of the knee.",
            difficulty: "Basic",
            diffColor: "text-green-600 bg-green-50 border-green-200"
        },
        {
            id: 'll2_snell',
            bookRefs: ['snell', 'snells', 'clinical anatomy', 'snell\'s', 'snell anatomy'],
            question: "A patient presents with 'foot drop'. According to clinical anatomy principles, damage to which nerve typically results in this condition?",
            options: ["Tibial nerve", "Obturator nerve", "Common fibular (peroneal) nerve", "Femoral nerve"],
            answer: 2,
            explanation: "Snell's Clinical Anatomy emphasizes that damage to the common fibular nerve paralyzes the dorsiflexors and evertors, leading to 'foot drop'.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        },
        {
            id: 'll3_fa',
            bookRefs: ['first aid', 'fa', 'usmle', 'step 1'],
            question: "In the context of board yield facts, which of the following bones articulates with the tibia to form the distal tibiofibular joint?",
            options: ["Talus", "Calcaneus", "Fibula", "Cuboid"],
            answer: 2,
            explanation: "High yield review resources note the distal end of the fibula articulates with the fibular notch of the tibia (a fibrous syndesmosis).",
            difficulty: "Basic",
            diffColor: "text-green-600 bg-green-50 border-green-200"
        },
        {
            id: 'll4_snell',
            bookRefs: ['snell', 'snells', 'clinical anatomy', 'snell\'s', 'snell anatomy'],
            question: "A surgeon is performing a saphenous vein cutdown. The great saphenous vein drains directly into which of the following vessels?",
            options: ["Popliteal vein", "Femoral vein", "External iliac vein", "Internal iliac vein"],
            answer: 1,
            explanation: "Clinical texts highlight the superficial course of the great saphenous vein as it drains into the femoral vein through the saphenous opening.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        },
        {
            id: 'll5_fa',
            bookRefs: ['first aid', 'fa', 'usmle', 'step 1'],
            question: "A football player is hit laterally on the knee. The 'unhappy triad' typically involves an injury to the anterior cruciate ligament, medial meniscus, and which other structure?",
            options: ["Posterior cruciate ligament", "Lateral meniscus", "Fibular collateral ligament (LCL)", "Tibial collateral ligament (MCL)"],
            answer: 3,
            explanation: "The classic 'unhappy triad' (O'Donoghue's triad) consists of tears to the ACL, MCL (tibial collateral ligament), and medial meniscus. This is a classic USMLE Step 1 concept.",
            difficulty: "Advanced",
            diffColor: "text-rose-600 bg-rose-50 border-rose-200"
        },
        {
            id: 'll6_grays',
            bookRefs: ['gray', 'grays', 'gray\'s anatomy', 'anatomy'],
            question: "Which detailed anatomical space provides passage for the femoral artery, vein, and saphenous nerve in the middle third of the thigh?",
            options: ["Femoral triangle", "Adductor canal (Hunter's canal)", "Popliteal fossa", "Obturator canal"],
            answer: 1,
            explanation: "Gray's Anatomy details the adductor canal as the passageway for these vessels before the artery and vein enter the popliteal fossa.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        }
    ],
    "pelvis": [
        {
            id: 'p1_snell',
            bookRefs: ['snell', 'snells', 'clinical anatomy', 'snell\'s', 'snell anatomy'],
            question: "Which structure is at highest risk of injury during a hysterectomy or pelvic surgery when ligating the uterine artery, as emphasized in clinical anatomy?",
            options: ["Obturator nerve", "Pudendal nerve", "Ureter", "Sciatic nerve"],
            answer: 2,
            explanation: "The ureter passes directly inferior to the uterine artery ('water under the bridge'). Clinical texts routinely highlight it as highly susceptible to accidental ligation during pelvic surgeries.",
            difficulty: "Advanced",
            diffColor: "text-rose-600 bg-rose-50 border-rose-200"
        }
    ],
    "glycolysis": [
        {
            id: 'g1',
            bookRefs: ['satyanarayana', 'biochemistry', 'harper', 'lippincott'],
            question: "Which of the following enzymes catalyzes the first committed, rate-limiting step of glycolysis?",
            options: ["Hexokinase", "Phosphofructokinase-1 (PFK-1)", "Aldolase", "Pyruvate kinase", "Phosphoglycerate kinase"],
            answer: 1,
            explanation: "According to Satyanarayana's Biochemistry, Phosphofructokinase-1 catalyzes the conversion of Fructose 6-phosphate to Fructose 1,6-bisphosphate. This is the most important control element and the committed step in the glycolytic pathway.",
            difficulty: "Basic",
            diffColor: "text-green-600 bg-green-50 border-green-200"
        },
        {
            id: 'g2',
            bookRefs: ['satyanarayana', 'biochemistry', 'harper', 'lippincott'],
            question: "A 10-year-old boy presents with severe hemolytic anemia and jaundice. Blood tests reveal decreased ATP production in red blood cells. A deficiency in which glycolytic enzyme is most likely responsible?",
            options: ["Hexokinase", "Glucokinase", "Pyruvate kinase", "Enolase", "Phosphofructokinase-1"],
            answer: 2,
            explanation: "Pyruvate kinase deficiency is the second most common cause of enzyme-deficient hemolytic anemia. RBCs rely entirely on glycolysis for ATP production; without adequate ATP from the pyruvate kinase step, the RBC membrane loses integrity, leading to hemolysis (Satyanarayana).",
            difficulty: "Advanced",
            diffColor: "text-rose-600 bg-rose-50 border-rose-200"
        },
        {
            id: 'g3',
            bookRefs: ['satyanarayana', 'biochemistry', 'harper', 'lippincott'],
            question: "During anaerobic glycolysis in skeletal muscle, pyruvate is reduced to lactate. Which enzyme catalyzes this reaction and what is the required coenzyme?",
            options: ["Pyruvate dehydrogenase, NAD+", "Lactate dehydrogenase, NADH", "Lactate dehydrogenase, NAD+", "Pyruvate carboxylase, Biotin", "Enolase, Mg2+"],
            answer: 1,
            explanation: "Lactate dehydrogenase reduces pyruvate to lactate, oxidizing NADH to NAD+ in the process. This regeneration of NAD+ is crucial for glycolysis to continue under anaerobic conditions.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        },
        {
            id: 'g4',
            bookRefs: ['satyanarayana', 'biochemistry', 'harper', 'lippincott'],
            question: "A patient with chronic alcoholism presents with neurological symptoms typical of Wernicke encephalopathy. Which glycolytic or associated pathway enzyme's activity would be most impaired due to this patient's likely vitamin deficiency?",
            options: ["Glyceraldehyde 3-phosphate dehydrogenase", "Phosphofructokinase-1", "Pyruvate kinase", "Pyruvate dehydrogenase", "Phosphoglycerate mutase"],
            answer: 3,
            explanation: "Chronic alcoholics are prone to thiamine (Vitamin B1) deficiency. Thiamine pyrophosphate (TPP) is an essential cofactor for the Pyruvate Dehydrogenase complex, which links glycolysis to the TCA cycle.",
            difficulty: "Advanced",
            diffColor: "text-rose-600 bg-rose-50 border-rose-200"
        },
        {
            id: 'g5',
            bookRefs: ['satyanarayana', 'biochemistry', 'harper', 'lippincott'],
            question: "In glycolysis, substrate-level phosphorylation occurs during which of the following reactions?",
            options: ["Glucose to Glucose-6-phosphate", "Fructose-6-phosphate to Fructose-1,6-bisphosphate", "1,3-Bisphosphoglycerate to 3-Phosphoglycerate", "2-Phosphoglycerate to Phosphoenolpyruvate", "Glucose-6-phosphate to Fructose-6-phosphate"],
            answer: 2,
            explanation: "Phosphoglycerate kinase catalyzes the transfer of a high-energy phosphate group from 1,3-BPG to ADP, forming ATP and 3-phosphoglycerate. This is the first example of substrate-level phosphorylation in glycolysis.",
            difficulty: "Intermediate",
            diffColor: "text-amber-600 bg-amber-50 border-amber-200"
        }
    ]
};

// Subject Data
const subjectData = {
    'anatomy': {
        title: 'Anatomy',
        icon: 'fa-bone',
        iconColor: 'text-medical-teal',
        bgColor: 'bg-medical-teal/10',
        desc: 'Explore skeletal structures, muscular systems, neuroanatomy, and highly detailed regional structures of the human body.',
        topics: ['Neuroanatomy', 'Upper Limb Anatomy', 'Pelvis and Perineum', 'Cranial Nerves']
    },
    'physiology': {
        title: 'Physiology',
        icon: 'fa-heart-pulse',
        iconColor: 'text-blue-500',
        bgColor: 'bg-blue-100',
        desc: 'Understand the standard mechanisms of cardiovascular, renal, respiratory, reproductive, and endocrine systems.',
        topics: ['Cardiac Cycle', 'Renal Physiology', 'Respiratory Mechanics', 'Action Potentials']
    },
    'biochemistry': {
        title: 'Biochemistry',
        icon: 'fa-dna',
        iconColor: 'text-purple-500',
        bgColor: 'bg-purple-100',
        desc: 'Dive into metabolic pathways, molecular biology, genetic diseases, and enzyme kinetics.',
        topics: ['Glycolysis', 'TCA Cycle', 'DNA Replication', 'Lipid Metabolism']
    },
    'clinical': {
        title: 'Clinical Medicine',
        icon: 'fa-stethoscope',
        iconColor: 'text-rose-500',
        bgColor: 'bg-rose-100',
        desc: 'Apply knowledge to pathology, pharmacology, diagnostic testing, and internal medicine cases.',
        topics: ['Heart Failure', 'Diabetes Mellitus', 'Antibiotics Mechanism', 'Acute Kidney Injury']
    }
};

// Application State
let currentQuestions = [];
let totalGenerated = 0;
let correctAnswers = 0;
let totalAttempted = 0;
let currentSearchTopic = '';

// DOM Elements - Home & Navigation
const heroSection = document.querySelector('section:nth-of-type(1)'); // Hero
const subjectsSection = document.getElementById('subjects');
const searchForm = document.getElementById('search-form');
const topicInput = document.getElementById('topic-input');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');
const subjectCards = document.querySelectorAll('.subject-card');

// DOM Elements - Subject Dashboard
const subjectDashboard = document.getElementById('subject-dashboard');
const backToHomeBtn = document.getElementById('back-to-home-btn');
const dTitle = document.getElementById('dashboard-subject-title');
const dDesc = document.getElementById('dashboard-subject-desc');
const dIcon = document.getElementById('subject-icon');
const dIconContainer = document.getElementById('subject-icon-container');
const dSearchForm = document.getElementById('dashboard-search-form');
const dTopicInput = document.getElementById('dashboard-topic-input');
const dBookInput = document.getElementById('dashboard-book-input');
const dSuggestedTopicsContainer = document.getElementById('suggested-topics-container');
const dSuggestedTopicsList = document.getElementById('suggested-topics-list');
const dSuggestedTopicSubject = document.getElementById('suggested-topic-subject');

// DOM Elements - Quiz Board
const quizSection = document.getElementById('quiz-board');
const quizTopicTitle = document.getElementById('quiz-topic-title');
const quizContainer = document.getElementById('quiz-container');
const loadingState = document.getElementById('loading-state');
const scoreCounter = document.getElementById('score-counter');
const attemptCounter = document.getElementById('total-attempted');
const generatedCounter = document.getElementById('total-generated');
const generateMoreBtnContainer = document.getElementById('generate-more-container');
const generateMoreBtn = document.getElementById('generate-more-btn');
const generateMoreText = document.getElementById('generate-more-text');
const finishQuizBtn = document.getElementById('finish-quiz-btn');

// State for custom count
let currentRequestedCount = 5;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {

    // Search Form Submit (Home)
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const topic = topicInput.value.trim().toLowerCase();
        const book = document.getElementById('book-input').value.trim();
        const count = parseInt(document.getElementById('bcq-count-input').value) || 5;
        if (topic) {
            startQuizSession(topic, count, book);
        }
    });

    // Search Form Submit (Dashboard)
    dSearchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const topic = dTopicInput.value.trim().toLowerCase();
        const book = dBookInput.value.trim();
        const count = parseInt(document.getElementById('dashboard-bcq-count-input').value) || 5;
        if (topic) {
            startQuizSession(topic, count, book);
        }
    });

    // Suggestion Buttons (Home)
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const topic = e.target.textContent.trim().toLowerCase();
            topicInput.value = topic;
            const book = document.getElementById('book-input').value.trim();
            const count = parseInt(document.getElementById('bcq-count-input').value) || 5;
            startQuizSession(topic, count, book);
        });
    });

    // Subject Card Click Events Navigation
    subjectCards.forEach(card => {
        card.addEventListener('click', () => {
            const subjectId = card.getAttribute('data-subject');
            openSubjectDashboard(subjectId);
        });
    });

    // Back to Home Button
    backToHomeBtn.addEventListener('click', () => {
        closeSubjectDashboard();
    });

    // Generate More Button
    if (generateMoreBtn) {
        generateMoreBtn.addEventListener('click', () => {
            generateMoreQuestions();
        });
    }

    if (finishQuizBtn) {
        finishQuizBtn.addEventListener('click', () => {
            showScorecard();
        });
    }

    // Scorecard Buttons
    const btnReturnDash = document.getElementById('btn-return-dashboard');
    if (btnReturnDash) {
        btnReturnDash.addEventListener('click', () => {
            document.getElementById('scorecard-screen').classList.add('hidden');
            heroSection.classList.remove('hidden');
            subjectsSection.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const btnRetry = document.getElementById('btn-retry-quiz');
    if (btnRetry) {
        btnRetry.addEventListener('click', () => {
            document.getElementById('scorecard-screen').classList.add('hidden');
            startQuizSession(currentSearchTopic, currentRequestedCount, currentSearchBook);
        });
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 20) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    });
});

/**
 * Navigation Logic
 */
function openSubjectDashboard(subjectId) {
    const data = subjectData[subjectId];

    // Hide Home Elements
    heroSection.classList.add('hidden');
    subjectsSection.classList.add('hidden');
    quizSection.classList.add('hidden');

    // Populate Dashboard Data
    dTitle.textContent = data.title;
    dDesc.textContent = data.desc;
    dIcon.className = `fa-solid ${data.icon} text-4xl`;
    dIconContainer.className = `w-20 h-20 rounded-2xl flex items-center justify-center shadow-inner ${data.bgColor} ${data.iconColor}`;

    // Populate Dashboard Suggestions
    dSuggestedTopicsList.innerHTML = '';
    dSuggestedTopicSubject.textContent = data.title;
    data.topics.forEach(t => {
        const btn = document.createElement('button');
        btn.className = "px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-medical-teal hover:text-medical-blue transition-colors shadow-sm";
        btn.textContent = t;
        btn.addEventListener('click', () => {
            dTopicInput.value = t;
            const book = dBookInput.value.trim();
            const count = parseInt(document.getElementById('dashboard-bcq-count-input').value) || 5;
            startQuizSession(t.toLowerCase(), count, book);
        });
        dSuggestedTopicsList.appendChild(btn);
    });
    dSuggestedTopicsContainer.classList.remove('hidden');

    // Show Dashboard
    subjectDashboard.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'auto' });
}

function closeSubjectDashboard() {
    subjectDashboard.classList.add('hidden');
    quizSection.classList.add('hidden');

    heroSection.classList.remove('hidden');
    subjectsSection.classList.remove('hidden');

    // Reset inputs
    topicInput.value = '';
    document.getElementById('book-input').value = '';
    dTopicInput.value = '';
    dBookInput.value = '';

    window.scrollTo({ top: 0, behavior: 'auto' });
}

/**
 * Handle Search & Quiz Session Start
 */
let currentSearchBook = '';
function startQuizSession(topic, count, book = '') {
    currentSearchTopic = topic;
    currentSearchBook = book;
    currentRequestedCount = count > 50 ? 50 : count; // Cap at 50 max per request to prevent browser hang

    // Update Generate More Text immediately
    generateMoreText.textContent = `Generate ${currentRequestedCount} More Questions`;

    // Reset state variables
    correctAnswers = 0;
    totalAttempted = 0;
    totalGenerated = 0;
    updateScoreBoard();

    // Show quiz section but clear content
    quizSection.classList.remove('hidden');
    quizContainer.innerHTML = '';
    generateMoreBtnContainer.classList.add('hidden');

    // Set title
    quizTopicTitle.textContent = topic.charAt(0).toUpperCase() + topic.slice(1);

    // Scroll to quiz safely
    setTimeout(() => {
        quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    generateQuestionsForTopic(topic, book);
}

/**
 * The Generation Engine - AI Integrated 
 */
// IMPORTANT: Paste your free Gemini API key here to generate real questions for any topic
const GEMINI_API_KEY = 'AIzaSyCZ8zD6DbjOAPe01hOf1YQhZ5dGTc9r7a4';

async function generateQuestionsWithGemini(topic, book, count, offset) {
    if (!GEMINI_API_KEY) {
        throw new Error("No Gemini API key found. Please paste your API key in app.js.");
    }

    const prompt = `You are the MedQuery Exam Engine, a specialized medical education AI. Generate ${count} Best Choice Questions (BCQs) about "${topic}".
${book ? `STRICT RULE: You MUST draw facts ONLY from the reference book: "${book}". Do not invent details not found in standard editions of this text. ` : ''}
Difficulty strictly set to: MBBS/MD professional modular exam level (avoid overly pedantic/PhD-level trivia). 
Question Mix: Provide a mix of Theoretical/Basic Science and Clinical Scenario BCQs. 
HOWEVER, bias heavily toward Theoretical/Basic Science questions unless the specific topic itself is a purely clinical disease. 
Respond ONLY with a JSON array of objects. Do not use Markdown formatting like \`\`\`json. Each object must have this structure:
{
  "question": "The question stem",
  "options": ["Option A", "Option B", "Option C", "Option D", "Option E"],
  "answer": 1, // index of the correct option (0-4)
  "explanation": "Detailed explanation citing the logic and matching the reference book.",
  "difficulty": "Basic" // Basic, Intermediate, or Advanced
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                temperature: 0.3,
                responseMimeType: "application/json"
            }
        })
    });

    if (!response.ok) {
        const errData = await response.json().catch(() => null);
        throw new Error(errData?.error?.message || "API request failed with status " + response.status);
    }

    const data = await response.json();
    let jsonText = data.candidates[0].content.parts[0].text;

    let qList = [];
    try {
        qList = JSON.parse(jsonText);
    } catch (e) {
        console.error("JSON Error parsing Gemini response:", jsonText);
        throw new Error("Unable to parse the AI response correctly. Please try again.");
    }

    return qList.map((q, idx) => {
        let diffColor = 'text-amber-600 bg-amber-50 border-amber-200';
        let diffLevel = q.difficulty || "Intermediate";
        if (diffLevel.includes('Basic')) diffColor = 'text-green-600 bg-green-50 border-green-200';
        if (diffLevel.includes('Advanced')) diffColor = 'text-rose-600 bg-rose-50 border-rose-200';

        return {
            id: `gemini-${offset}-${idx}`,
            question: q.question,
            options: q.options,
            answer: q.answer,
            explanation: q.explanation,
            difficulty: diffLevel,
            diffColor: diffColor
        };
    });
}

async function generateQuestionsForTopic(topic, book) {
    loadingState.classList.replace('hidden', 'flex');
    generateMoreBtnContainer.classList.add('hidden');

    try {
        const dbKeys = Object.keys(mockDatabase);
        const matchKey = dbKeys.find(k => k === topic || topic.includes(k) || k.includes(topic));

        let newQuestions = [];

        // Add an artificial small delay for UI smoothness
        await new Promise(r => setTimeout(r, 800));

        if (matchKey && totalGenerated === 0) {
            let staticQs = mockDatabase[matchKey];
            if (book) {
                const searchBookTokens = book.toLowerCase().trim().split(/[\s,]+/);
                const filteredQs = staticQs.filter(q => {
                    if (!q.bookRefs) return true;
                    return searchBookTokens.some(token =>
                        q.bookRefs.some(ref => ref.includes(token) || token.includes(ref))
                    );
                });
                if (filteredQs.length > 0) staticQs = filteredQs;
            }

            for (let i = staticQs.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [staticQs[i], staticQs[j]] = [staticQs[j], staticQs[i]];
            }

            if (currentRequestedCount <= staticQs.length) {
                newQuestions = staticQs.slice(0, currentRequestedCount);
            } else {
                newQuestions = staticQs;
                let remaining = currentRequestedCount - staticQs.length;
                let apiQs = await generateQuestionsWithGemini(topic, book, remaining, totalGenerated + staticQs.length);
                newQuestions = newQuestions.concat(apiQs);
            }
        } else {
            let apiQs = await generateQuestionsWithGemini(topic, book, currentRequestedCount, totalGenerated);
            newQuestions = apiQs;
        }

        totalGenerated += newQuestions.length;
        generatedCounter.textContent = totalGenerated;

        appendQuestionsToDOM(newQuestions);
        generateMoreBtnContainer.classList.remove('hidden');
        if (finishQuizBtn) finishQuizBtn.classList.add('hidden');
        if (generateMoreBtn) generateMoreBtn.classList.remove('hidden');

    } catch (e) {
        console.error("Generation Error:", e);
        alert("Generation Error: " + e.message);
    } finally {
        loadingState.classList.replace('flex', 'hidden');
    }
}

function showScorecard() {
    quizSection.classList.add('hidden');
    const scorecardScreen = document.getElementById('scorecard-screen');
    if (scorecardScreen) scorecardScreen.classList.remove('hidden');

    document.getElementById('score-correct').textContent = correctAnswers;
    document.getElementById('score-total').textContent = totalAttempted;

    const percentage = totalAttempted === 0 ? 0 : Math.round((correctAnswers / totalAttempted) * 100);
    document.getElementById('score-percentage').textContent = `${percentage}%`;

    const scoreCardMessage = document.getElementById('scorecard-message');
    if (percentage >= 80) {
        scoreCardMessage.textContent = "Excellent Medical Knowledge! You have a solid grasp of this topic.";
        scoreCardMessage.className = "text-green-600 font-medium";
    } else if (percentage >= 60) {
        scoreCardMessage.textContent = "Good effort. Reviewing specific details will help solidify your understanding.";
        scoreCardMessage.className = "text-amber-500 font-medium";
    } else {
        scoreCardMessage.textContent = "More study required for this heavily tested concept. Keep reviewing!";
        scoreCardMessage.className = "text-red-500 font-medium";
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function generateMoreQuestions() {
    generateQuestionsForTopic(currentSearchTopic, currentSearchBook);
}

/**
 * Generic Infinite Question Generator
 */
function createGenericDynamicQuestions(topic, offset, count = 5, book = '') {
    const questions = [];
    const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

    let isAnatomy = false;
    let concepts = ['Mechanism', 'Pathology', 'Clinical Feature', 'Treatment', 'Diagnosis'];
    if (topic.includes('limb') || topic.includes('anatomy') || topic.includes('pelvis') || topic.includes('muscle') || topic.includes('nerve') || topic.includes('bone')) {
        concepts = ['Muscles', 'Nerves', 'Bones', 'Blood Supply', 'Clinical Correlation'];
        isAnatomy = true;
    }

    const diffs = [
        { d: 'Basic', c: 'text-green-600 bg-green-50 border-green-200' },
        { d: 'Intermediate', c: 'text-amber-600 bg-amber-50 border-amber-200' },
        { d: 'Advanced', c: 'text-rose-600 bg-rose-50 border-rose-200' }
    ];

    const ages = [22, 35, 45, 50, 65, 70];
    const patientTypes = ["athlete", "office worker", "manual laborer", "teacher", "hypertensive patient"];

    for (let i = 0; i < count; i++) {
        const uniqueId = offset + i; // use global offset to prevent duplicates completely
        const id = `dq-${offset}-${i}`;
        const concept = concepts[uniqueId % concepts.length];
        const diffObj = diffs[uniqueId % diffs.length];
        const age = ages[uniqueId % ages.length];
        const ptType = patientTypes[uniqueId % patientTypes.length];

        let questionText = "";
        let explanationText = "";
        let optionStems = [];

        // Generate realistic sounding text based on the concept and add uniqueness based on index so it varies!
        if (isAnatomy) {
            if (concept === 'Muscles') {
                questionText = `During the examination of a ${age}-year-old ${ptType}, assessing the ${formattedTopic}, which of the following muscles is primarily isolated when evaluating its prime moving action?`;
                optionStems = [`A superficial flexor specific to the region`, `The primary extensor compartment leader`, `A minor synergist muscle noted in deep fascial layers`, `An antagonist muscle often compensating for injuries`];
            } else if (concept === 'Nerves') {
                questionText = `A ${age}-year-old patient suffers a direct laceration to the primary nerve innervating the ${formattedTopic}. This would most likely result in which defining clinical deficit?`;
                optionStems = [`Loss of epicritic sensation in a characteristic dermatomal patch`, `Profound motor weakness in the main functional compartment`, `Exaggerated deep tendon reflexes extending distally`, `Complete flaccid paralysis combining multiple myotomes`];
            } else if (concept === 'Bones') {
                questionText = `Radiographic imaging of the ${formattedTopic} in a trauma patient highlights a key bony landmark serving as the primary attachment site for stabilizing ligaments. Which structure is this?`;
                optionStems = [`The prominent tuberosity on the lateral aspect`, `The defining medial articular surface`, `A distal secondary epicondyle`, `A roughened proximal facet`];
            } else if (concept === 'Blood Supply') {
                questionText = `In surgical planning for a mass resection near the ${formattedTopic}, the primary arterial supply must be preserved. This vessel arises directly as a branch of which major artery?`;
                optionStems = [`A superficial collateral artery pathway`, `The main deep axial artery of the region`, `An unnamed recurrent venous/arterial plexus`, `An ascending perforating branch`];
            } else { // Clinical
                questionText = `A ${age}-year-old ${ptType} presents with pain and characteristic functional decline relating to the ${formattedTopic}. Based on highest incidence rates, which of the following is the most likely diagnosis?`;
                optionStems = [`A rare congenital structural anomaly`, `A common entrapment neuropathy or musculotendinous tear`, `An early-onset demyelinating disease presenting locally`, `A generalized systemic infection localizing to the area`];
            }
        } else {
            questionText = `In a ${age}-year-old patient evaluating for conditions related to ${formattedTopic}, which of the following statements specifically describes its primary ${concept.toLowerCase()}?`;
            optionStems = [
                `A plausible but incorrect distractor regarding ${formattedTopic} mechanisms`,
                `The correct fundamental ${concept.toLowerCase()} characteristic associated with ${formattedTopic}`,
                `An outdated medical explanation related to ${formattedTopic} etiology`,
                `A factually correct statement, but applying to a completely different systemic condition`
            ];
        }

        explanationText = `This dynamically generated question (${uniqueId + 1}) evaluates knowledge of the ${concept} of the ${formattedTopic}. The correct option represents the most clinically and anatomically accurate relationship based on standard medical curricula.`;

        // Apply advanced book level matching
        if (book) {
            const lowerBook = book.toLowerCase();
            // Check if it's Snell (clinical) - Force clinical wording and increase perceived difficulty
            if (lowerBook.includes('snell')) {
                questionText = `According to Snell's Clinical Anatomy principles, in a ${age}-year-old presenting with a defect in the ${formattedTopic}, ` + questionText.replace(/^.*\b(which|what|this would|the primary)\b/i, '$1');
                explanationText = `Snell's Clinical Anatomy emphasizes practical knowledge and presentation. This tests the clinical application of ${formattedTopic}.`;
                // Check if it's Grays (detailed anatomy)
            } else if (lowerBook.includes('gray')) {
                questionText = `As detailed in the systematic approach of Gray's Anatomy, concerning the deep structural relations of the ${formattedTopic}, ` + questionText.replace(/^.*\b(which|what|this would|the primary)\b/i, '$1');
                explanationText = `Gray's Anatomy provides exhaustive detail on regional anatomy. The correct option reflects the precise anatomical spatial relationship of ${formattedTopic}.`;
            } else {
                questionText = `According to the framework presented in ${book}, regarding the ${formattedTopic}, ` + questionText.replace(/^[A-Z]/, letter => letter.toLowerCase());
                explanationText = `As detailed in ${book}, this evaluates your understanding of the ${concept} of ${formattedTopic}.`;
            }
        }

        questions.push({
            id: id,
            question: questionText,
            options: optionStems,
            answer: 1, // Correct answer will always initially be index 1
            explanation: explanationText,
            difficulty: diffObj.d,
            diffColor: diffObj.c
        });
    }

    // Randomize option order and maintain correct answer state using data attributes instead of just relying on the index,
    // to make grading visually reliable after shuffle.
    questions.forEach(q => {
        // Tag options so we know which is true before shuffle
        const taggedOptions = q.options.map((opt, idx) => ({
            text: opt,
            isCorrect: idx === q.answer
        }));

        // Shuffle tagged options
        for (let i = taggedOptions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [taggedOptions[i], taggedOptions[j]] = [taggedOptions[j], taggedOptions[i]];
        }

        // Re-assign plain strings to options array
        q.options = taggedOptions.map(t => t.text);

        // Set the new correct answer index based on where the true option landed
        q.answer = taggedOptions.findIndex(t => t.isCorrect);
    });

    return questions;
}

/**
 * Render Questions into DOM - Incremental Append
 */
function appendQuestionsToDOM(questions) {
    // We don't reset DOM, we append to allow infinite scrolling
    const startIndex = totalGenerated - questions.length;

    questions.forEach((q, loopIndex) => {
        const absoluteIndex = startIndex + loopIndex;

        let optionsHTML = '';
        q.options.forEach((opt, oIndex) => {
            const isCorrect = (oIndex === q.answer);
            optionsHTML += `
                <button class="option-btn text-left p-4 rounded-xl border border-gray-200 w-full mb-3 bg-white text-gray-700 font-medium hover:shadow-sm flex items-start gap-3 group" 
                        data-qid="${q.id}" data-idx="${oIndex}" data-is-correct="${isCorrect}">
                    <div class="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:border-medical-teal text-sm transition-colors text-transparent">
                        <i class="fa-solid fa-check"></i>
                    </div>
                    <span>${opt}</span>
                </button>
            `;
        });

        const cardHTML = `
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 animate-fade-in-up" id="card-${q.id}">
                <!-- Header -->
                <div class="flex justify-between items-start mb-6">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${q.diffColor} uppercase tracking-wider">
                        <i class="fa-solid fa-layer-group mr-1.5"></i> ${q.difficulty}
                    </span>
                    <span class="text-gray-400 font-medium text-sm border border-gray-100 rounded-lg px-3 py-1 bg-gray-50 bg-opacity-50 inline-block font-heading">
                        Q.${absoluteIndex + 1}
                    </span>
                </div>
                
                <!-- Question -->
                <h3 class="text-xl md:text-2xl font-semibold text-gray-800 mb-8 leading-snug">${q.question}</h3>
                
                <!-- Options -->
                <div class="options-container flex flex-col mb-2">
                    ${optionsHTML}
                </div>
                
                <!-- Explanation Action -->
                <div class="mt-6 border-t border-gray-100 pt-6 flex justify-between items-center explanation-toggle-container hidden">
                    <button class="text-medical-blue hover:text-medical-dark font-medium flex items-center gap-2 transition-colors toggle-exp-btn" data-qid="${q.id}">
                        <i class="fa-solid fa-lightbulb text-medical-accent"></i> 
                        <span>Show Explanation</span>
                        <i class="fa-solid fa-chevron-down text-xs transition-transform transform"></i>
                    </button>
                </div>
                
                <!-- Explanation Content -->
                <div id="exp-${q.id}" class="explanation-panel bg-medical-light/50 rounded-xl px-6 text-gray-700 border-l-4 border-medical-blue mt-4 text-sm md:text-base leading-relaxed">
                    <div class="font-semibold text-medical-dark mb-1">Detailed Explanation:</div>
                    ${q.explanation}
                </div>
            </div>
        `;

        quizContainer.insertAdjacentHTML('beforeend', cardHTML);
    });

    // Attach Event Listeners to rendered Options
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', handleOptionClick);
    });

    // Attach Event Listeners for Expanation Toggles
    document.querySelectorAll('.toggle-exp-btn').forEach(btn => {
        btn.addEventListener('click', toggleExplanation);
    });
}

/**
 * Handle Option Selection
 */
function handleOptionClick(e) {
    const btn = e.currentTarget;
    const qid = btn.getAttribute('data-qid');
    const selectedIdx = parseInt(btn.getAttribute('data-idx'));
    const isCorrect = btn.getAttribute('data-is-correct') === 'true';

    // Get corresponding card container
    const card = document.getElementById(`card-${qid}`);

    // Lock all options in this card
    const allOptions = card.querySelectorAll('.option-btn');
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        // highlight correct option regardless
        if (opt.getAttribute('data-is-correct') === 'true') {
            opt.classList.add('show-correct');
            opt.querySelector('div').classList.add('bg-green-500', 'border-green-500', 'text-white');
            opt.querySelector('div').classList.remove('text-transparent');
        }
    });

    // Score Tracking Update
    totalAttempted++;

    if (isCorrect) {
        btn.classList.add('selected-correct');
        correctAnswers++;
    } else {
        btn.classList.add('selected-incorrect');
        btn.classList.remove('show-correct');

        // Show X icon
        const iconContainer = btn.querySelector('div');
        iconContainer.classList.add('bg-red-500', 'border-red-500', 'text-white');
        iconContainer.classList.remove('text-transparent');
        iconContainer.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    // Show Explanation Toggle
    card.querySelector('.explanation-toggle-container').classList.remove('hidden');

    // Update global score
    updateScoreBoard();

    // Check if finished
    if (totalAttempted === totalGenerated) {
        if (generateMoreBtn) generateMoreBtn.classList.add('hidden');
        if (finishQuizBtn) finishQuizBtn.classList.remove('hidden');
    }
}

/**
 * Toggle Explanation Visibility
 */
function toggleExplanation(e) {
    const btn = e.currentTarget;
    const qid = btn.getAttribute('data-qid');
    const panel = document.getElementById(`exp-${qid}`);

    const icon = btn.querySelector('.fa-chevron-down');
    const text = btn.querySelector('span');

    if (panel.classList.contains('expanded')) {
        panel.classList.remove('expanded');
        icon.style.transform = "rotate(0deg)";
        text.textContent = "Show Explanation";
    } else {
        panel.classList.add('expanded');
        icon.style.transform = "rotate(180deg)";
        text.textContent = "Hide Explanation";
    }
}

/**
 * Update Score Board
 */
function updateScoreBoard() {
    scoreCounter.textContent = correctAnswers;
    attemptCounter.textContent = totalAttempted;

    // Fun visual effect when score increases
    if (correctAnswers > 0) {
        scoreCounter.classList.add('text-green-500', 'scale-110');
        setTimeout(() => {
            scoreCounter.classList.remove('text-green-500', 'scale-110');
        }, 300);
    }
}



