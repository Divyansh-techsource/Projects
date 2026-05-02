/* ============================================
   QUIZMASTER PRO — script.js
   Questions are separated by difficulty per
   category so each mode has unique content.
   ============================================ */

'use strict';

/* ─── QUESTION BANK (category, difficulty, questions) ─── */
const QUESTIONS = {

  /*GENERAL*/
  general: {
    easy: [
      { q: "What is the capital of Australia?",                   opts: ["Sydney","Melbourne","Canberra","Perth"],             ans: 2 },
      { q: "Which planet is known as the Red Planet?",            opts: ["Venus","Mars","Jupiter","Saturn"],                   ans: 1 },
      { q: "How many continents are there on Earth?",             opts: ["5","6","7","8"],                                     ans: 2 },
      { q: "Who painted the Mona Lisa?",                          opts: ["Michelangelo","Raphael","Leonardo da Vinci","Caravaggio"], ans: 2 },
      { q: "What is the largest ocean on Earth?",                 opts: ["Atlantic","Indian","Arctic","Pacific"],              ans: 3 },
      { q: "How many bones are in the adult human body?",         opts: ["186","206","226","246"],                             ans: 1 },
      { q: "What language has the most native speakers?",         opts: ["English","Spanish","Mandarin","Hindi"],              ans: 2 },
      { q: "What is the smallest country in the world?",          opts: ["Monaco","San Marino","Vatican City","Liechtenstein"],ans: 2 },
      { q: "What year did World War II end?",                     opts: ["1943","1944","1945","1946"],                         ans: 2 },
      { q: "Which animal is the fastest on land?",                opts: ["Lion","Horse","Cheetah","Leopard"],                  ans: 2 },
      { q: "How many sides does a hexagon have?",                 opts: ["5","6","7","8"],                                     ans: 1 },
      { q: "What gas do humans breathe in to survive?",           opts: ["Carbon Dioxide","Hydrogen","Oxygen","Nitrogen"],     ans: 2 },
    ],
    medium: [
      { q: "Which country has the longest coastline in the world?",       opts: ["Russia","Australia","Norway","Canada"],        ans: 3 },
      { q: "What is the currency of Japan?",                              opts: ["Yuan","Won","Yen","Ringgit"],                  ans: 2 },
      { q: "In which year did the Titanic sink?",                         opts: ["1910","1912","1914","1916"],                   ans: 1 },
      { q: "Which organ produces insulin in the human body?",             opts: ["Liver","Kidney","Pancreas","Stomach"],         ans: 2 },
      { q: "What is the largest desert in the world?",                    opts: ["Sahara","Arabian","Gobi","Antarctic"],         ans: 3 },
      { q: "The Great Wall was primarily built to protect against which group?", opts: ["Mongols","Romans","Persians","Arabs"],  ans: 0 },
      { q: "Which element has the chemical symbol 'Fe'?",                 opts: ["Fluorine","Iron","Francium","Fermium"],        ans: 1 },
      { q: "How many chambers does a human heart have?",                  opts: ["2","3","4","5"],                               ans: 2 },
      { q: "Mount Everest is located in which mountain range?",           opts: ["Andes","Alps","Rockies","Himalayas"],          ans: 3 },
      { q: "Which Shakespeare play features the character Hamlet?",       opts: ["Macbeth","Othello","Hamlet","King Lear"],      ans: 2 },
      { q: "What is the capital of Brazil?",                              opts: ["Rio de Janeiro","Sao Paulo","Brasilia","Salvador"], ans: 2 },
      { q: "Which gas is most abundant in Earth's atmosphere?",           opts: ["Oxygen","Carbon Dioxide","Argon","Nitrogen"],  ans: 3 },
    ],
    hard: [
      { q: "What is the Fibonacci sequence's 10th number?",               opts: ["34","55","89","144"],                          ans: 1 },
      { q: "Which treaty ended the First World War?",                     opts: ["Treaty of Paris","Treaty of Versailles","Treaty of Utrecht","Treaty of Vienna"], ans: 1 },
      { q: "The Coriolis effect influences the direction of what?",       opts: ["Ocean tides","Wind currents","Earthquakes","Volcanic eruptions"], ans: 1 },
      { q: "What is the approximate circumference of the Earth?",         opts: ["30,000 km","40,075 km","50,000 km","35,000 km"], ans: 1 },
      { q: "Which philosopher wrote 'Critique of Pure Reason'?",          opts: ["Hegel","Nietzsche","Kant","Descartes"],         ans: 2 },
      { q: "What is the rarest blood type in humans?",                    opts: ["AB-","O-","B-","A-"],                           ans: 0 },
      { q: "In economics, what does 'GDP' measure?",                      opts: ["Trade surplus","National debt","Total economic output","Inflation rate"], ans: 2 },
      { q: "What is the half-life of Carbon-14?",                         opts: ["1,000 years","5,730 years","10,000 years","50,000 years"], ans: 1 },
      { q: "Which country has the most UNESCO World Heritage Sites?",      opts: ["China","Italy","Spain","France"],              ans: 1 },
      { q: "A word that reads the same forwards and backwards is called?", opts: ["Anagram","Palindrome","Oxymoron","Homonym"],   ans: 1 },
      { q: "The Mariana Trench is located in which ocean?",               opts: ["Atlantic","Indian","Arctic","Pacific"],         ans: 3 },
      { q: "What is the Mpemba effect?",                                  opts: ["Cold water boiling faster","Hot water freezing faster","Ice melting slower","Steam condensing faster"], ans: 1 },
    ],
  },

  /*SCIENCE*/
  science: {
    easy: [
      { q: "What is the chemical symbol for gold?",               opts: ["Go","Gd","Au","Ag"],                                 ans: 2 },
      { q: "What force keeps planets in orbit around the Sun?",   opts: ["Magnetism","Gravity","Nuclear force","Friction"],    ans: 1 },
      { q: "What is the powerhouse of the cell?",                 opts: ["Nucleus","Ribosome","Mitochondria","Vacuole"],       ans: 2 },
      { q: "What gas do plants absorb during photosynthesis?",    opts: ["Oxygen","Nitrogen","Carbon Dioxide","Hydrogen"],     ans: 2 },
      { q: "What is the hardest natural substance on Earth?",     opts: ["Steel","Quartz","Titanium","Diamond"],               ans: 3 },
      { q: "What planet is closest to the Sun?",                  opts: ["Venus","Earth","Mercury","Mars"],                    ans: 2 },
      { q: "Water is made of which two elements?",                opts: ["Hydrogen & Carbon","Oxygen & Carbon","Hydrogen & Oxygen","Nitrogen & Oxygen"], ans: 2 },
      { q: "What is the unit of electrical resistance?",          opts: ["Volt","Ampere","Watt","Ohm"],                        ans: 3 },
      { q: "What organ pumps blood through the human body?",      opts: ["Lungs","Liver","Kidney","Heart"],                    ans: 3 },
      { q: "What is the boiling point of water at sea level?",    opts: ["90C","95C","100C","105C"],                           ans: 2 },
      { q: "Which planet has rings around it?",                   opts: ["Jupiter","Mars","Saturn","Neptune"],                 ans: 2 },
      { q: "What colour is chlorophyll?",                         opts: ["Yellow","Blue","Red","Green"],                       ans: 3 },
    ],
    medium: [
      { q: "What is the speed of light in a vacuum (approx)?",     opts: ["300,000 km/s","150,000 km/s","600,000 km/s","30,000 km/s"], ans: 0 },
      { q: "What is the atomic number of Carbon?",                 opts: ["4","6","8","12"],                                   ans: 1 },
      { q: "DNA stands for?",                                      opts: ["Deoxyribonucleic Acid","Dinitrogen Amino Acid","Dual Nuclear Array","Dynamic Nucleic Agent"], ans: 0 },
      { q: "Which planet has the most moons (as of 2024)?",        opts: ["Jupiter","Neptune","Saturn","Uranus"],              ans: 2 },
      { q: "What is the most abundant gas in Earth's atmosphere?", opts: ["Oxygen","Argon","Carbon Dioxide","Nitrogen"],       ans: 3 },
      { q: "What type of bond holds water molecules together?",    opts: ["Covalent","Ionic","Hydrogen","Metallic"],           ans: 2 },
      { q: "Which organelle is responsible for protein synthesis?",opts: ["Golgi apparatus","Ribosome","Lysosome","Vacuole"], ans: 1 },
      { q: "What is the pH of pure water?",                        opts: ["5","6","7","8"],                                   ans: 2 },
      { q: "Which law states force = mass x acceleration?",        opts: ["Newton 1st","Newton 2nd","Newton 3rd","Hookes Law"], ans: 1 },
      { q: "What is the chemical formula for table salt?",         opts: ["NaCl","KCl","NaOH","MgCl2"],                       ans: 0 },
      { q: "What is the term for the change from liquid to gas?",  opts: ["Condensation","Sublimation","Evaporation","Melting"], ans: 2 },
      { q: "What is the term for animals that eat only plants?",   opts: ["Carnivore","Omnivore","Herbivore","Detritivore"],   ans: 2 },
    ],
    hard: [
      { q: "What is the Heisenberg Uncertainty Principle about?",   opts: ["Speed of light","Quantum measurement limits","Nuclear decay","Gravity waves"], ans: 1 },
      { q: "What particle has no electric charge?",                 opts: ["Proton","Electron","Neutron","Positron"],          ans: 2 },
      { q: "What is the process by which a cell divides into two?", opts: ["Meiosis","Mitosis","Osmosis","Apoptosis"],         ans: 1 },
      { q: "Which type of radiation has the highest penetrating power?", opts: ["Alpha","Beta","Gamma","UV"],                 ans: 2 },
      { q: "What is the SI unit of luminous intensity?",            opts: ["Lux","Lumen","Candela","Watt"],                   ans: 2 },
      { q: "What does Schrodingers cat illustrate?",                opts: ["Relativity","Quantum superposition","Nuclear fission","String theory"], ans: 1 },
      { q: "What is the boundary around a black hole called?",      opts: ["Photon sphere","Accretion disk","Event horizon","Singularity"], ans: 2 },
      { q: "How many base pairs does human DNA contain (approx)?",  opts: ["3 billion","30 million","3 trillion","300 million"], ans: 0 },
      { q: "What is the Krebs cycle also known as?",                opts: ["Glycolysis","Citric acid cycle","Calvin cycle","Urea cycle"], ans: 1 },
      { q: "What does CRISPR stand for (first word)?",              opts: ["Clustered","Catalytic","Chromatin","Circular"],    ans: 0 },
      { q: "What is the oxidation state of Oxygen in H2O?",         opts: ["+2","-2","0","+1"],                               ans: 1 },
      { q: "What is the force carrier for electromagnetism?",       opts: ["Gluon","Graviton","Photon","W boson"],             ans: 2 },
    ],
  },

  /*HISTORY*/
  history: {
    easy: [
      { q: "Who was the first President of the United States?",    opts: ["John Adams","Thomas Jefferson","George Washington","Benjamin Franklin"], ans: 2 },
      { q: "What empire built the Colosseum?",                     opts: ["Greek","Roman","Ottoman","Byzantine"],              ans: 1 },
      { q: "The Berlin Wall fell in which year?",                  opts: ["1987","1988","1989","1990"],                        ans: 2 },
      { q: "Which country launched the first satellite into space?",opts: ["USA","Germany","USSR","UK"],                      ans: 2 },
      { q: "The Renaissance originated in which country?",         opts: ["France","Germany","Spain","Italy"],                ans: 3 },
      { q: "Who was the Egyptian queen linked to Julius Caesar?",  opts: ["Nefertiti","Hatshepsut","Cleopatra VII","Isis"],    ans: 2 },
      { q: "Which event began World War I?",                       opts: ["Invasion of Poland","Assassination of Archduke Franz Ferdinand","Bombing of Pearl Harbor","Russian Revolution"], ans: 1 },
      { q: "In which country did the Industrial Revolution begin?",opts: ["France","USA","Germany","England"],                ans: 3 },
      { q: "What year did Columbus first arrive in the Americas?",  opts: ["1390","1492","1512","1602"],                       ans: 1 },
      { q: "Which civilization built the pyramids at Giza?",       opts: ["Greek","Roman","Mesopotamian","Egyptian"],         ans: 3 },
      { q: "The Declaration of Independence was signed in which year?", opts: ["1774","1775","1776","1777"],                  ans: 2 },
      { q: "Which city was the capital of the ancient Roman Empire?", opts: ["Athens","Carthage","Rome","Constantinople"],    ans: 2 },
    ],
    medium: [
      { q: "In what year did the French Revolution begin?",         opts: ["1769","1779","1789","1799"],                       ans: 2 },
      { q: "Which country was the first to grant women the right to vote?", opts: ["USA","UK","New Zealand","France"],        ans: 2 },
      { q: "The Magna Carta was signed in which century?",          opts: ["11th","12th","13th","14th"],                       ans: 2 },
      { q: "Which ancient wonder was located in Alexandria?",       opts: ["Hanging Gardens","Colossus of Rhodes","The Great Pyramid","Lighthouse of Alexandria"], ans: 3 },
      { q: "Who led the Cuban Revolution?",                         opts: ["Che Guevara","Fidel Castro","Hugo Chavez","Francisco Franco"], ans: 1 },
      { q: "The Opium Wars were fought between China and which country?", opts: ["France","USA","Russia","Britain"],          ans: 3 },
      { q: "Which empire was ruled by Genghis Khan?",               opts: ["Ottoman","Mongol","Roman","Persian"],              ans: 1 },
      { q: "The Treaty of Versailles was signed after which war?",  opts: ["WWI","WWII","Crimean War","Napoleonic Wars"],      ans: 0 },
      { q: "Who was the first emperor of unified China?",           opts: ["Han Wudi","Qin Shi Huang","Tang Taizong","Ming Hongwu"], ans: 1 },
      { q: "Which leader became South Africa's first Black president?", opts: ["Desmond Tutu","Steve Biko","Nelson Mandela","Thabo Mbeki"], ans: 2 },
      { q: "Where did the first successful powered airplane flight occur?", opts: ["Dayton","Kitty Hawk","Chicago","Boston"],  ans: 1 },
      { q: "The Haitian Revolution created the first Black republic in which year?", opts: ["1791","1804","1810","1821"],      ans: 1 },
    ],
    hard: [
      { q: "The Peace of Westphalia (1648) ended which war?",        opts: ["Thirty Years War","Hundred Years War","Seven Years War","War of Roses"], ans: 0 },
      { q: "Which Byzantine emperor codified the Corpus Juris Civilis?", opts: ["Constantine","Justinian I","Theodosius","Basil II"], ans: 1 },
      { q: "What year did the Ottoman Empire formally dissolve?",    opts: ["1918","1922","1924","1928"],                       ans: 1 },
      { q: "Who wrote 'The Art of War'?",                           opts: ["Confucius","Lao Tzu","Sun Tzu","Mencius"],          ans: 2 },
      { q: "The Scramble for Africa primarily occurred in which century?", opts: ["17th","18th","19th","20th"],                ans: 2 },
      { q: "Which battle is considered Napoleon's greatest victory?", opts: ["Waterloo","Borodino","Austerlitz","Leipzig"],    ans: 2 },
      { q: "The Meiji Restoration transformed which country?",       opts: ["China","Korea","Japan","Vietnam"],                ans: 2 },
      { q: "Who was the last Tsar of Russia?",                       opts: ["Alexander III","Nicholas I","Alexander II","Nicholas II"], ans: 3 },
      { q: "The Peloponnesian War was fought between Athens and which city-state?", opts: ["Corinth","Thebes","Sparta","Troy"], ans: 2 },
      { q: "What was the name of the first human to orbit Earth?",   opts: ["Neil Armstrong","Alan Shepard","Yuri Gagarin","Buzz Aldrin"], ans: 2 },
      { q: "The Sykes-Picot Agreement (1916) divided which region?", opts: ["South Asia","Southeast Asia","Middle East","Sub-Saharan Africa"], ans: 2 },
      { q: "Which empire was called the Sick Man of Europe in the 19th century?", opts: ["Austro-Hungarian","Russian","Ottoman","British"], ans: 2 },
    ],
  },

  /*TECH*/
  tech: {
    easy: [
      { q: "What does CPU stand for?",                              opts: ["Central Processing Unit","Core Processing Utility","Computer Power Unit","Central Program Uplink"], ans: 0 },
      { q: "What does HTML stand for?",                            opts: ["HyperText Markup Language","High-Tech Media Language","HyperTransfer Markup Logic","HyperText Machine Language"], ans: 0 },
      { q: "Who co-founded Apple with Steve Jobs?",                opts: ["Bill Gates","Steve Wozniak","Linus Torvalds","Paul Allen"], ans: 1 },
      { q: "Which language is primarily used for styling web pages?", opts: ["JavaScript","HTML","CSS","PHP"],                 ans: 2 },
      { q: "Which company developed the Android operating system?",opts: ["Apple","Microsoft","Samsung","Google"],            ans: 3 },
      { q: "What does URL stand for?",                             opts: ["Uniform Resource Locator","Universal Request Link","Unified Remote Layer","User Resource Location"], ans: 0 },
      { q: "What does RAM stand for?",                             opts: ["Read-Access Memory","Random-Access Memory","Rapid-Application Module","Redundant Array Memory"], ans: 1 },
      { q: "Which company makes the iPhone?",                      opts: ["Samsung","Sony","Google","Apple"],                  ans: 3 },
      { q: "What symbol is used in email addresses?",              opts: ["#","@","$","%"],                                   ans: 1 },
      { q: "How many bits are in one byte?",                       opts: ["4","6","8","16"],                                  ans: 2 },
      { q: "What key combination is used to copy text?",           opts: ["Ctrl+V","Ctrl+X","Ctrl+C","Ctrl+Z"],               ans: 2 },
      { q: "What does Wi-Fi allow devices to do?",                 opts: ["Print wirelessly","Connect to the internet wirelessly","Charge wirelessly","Sync via Bluetooth"], ans: 1 },
    ],
    medium: [
      { q: "Which company created the Java programming language?",  opts: ["Microsoft","Apple","Sun Microsystems","IBM"],     ans: 2 },
      { q: "What does HTTP stand for?",                            opts: ["HyperText Transfer Protocol","High Text Transmission Protocol","HyperTransfer Text Protocol","Host Transfer Text Protocol"], ans: 0 },
      { q: "Which data structure follows the LIFO principle?",      opts: ["Queue","Stack","Tree","Graph"],                   ans: 1 },
      { q: "What is the binary representation of the decimal number 10?", opts: ["1010","1100","1001","1110"],               ans: 0 },
      { q: "What does GPU stand for?",                             opts: ["General Processing Unit","Graphics Processing Unit","Graphical Power Utility","Grid Processing Unit"], ans: 1 },
      { q: "What does SQL stand for?",                             opts: ["Structured Query Language","Simple Query Logic","Standard Query Listing","System Query Language"], ans: 0 },
      { q: "What does an IP address identify?",                    opts: ["A file","A device on a network","A programming language","A type of cable"], ans: 1 },
      { q: "Which programming language uses #include for libraries?", opts: ["Java","Python","C++","JavaScript"],            ans: 2 },
      { q: "What is a cookie in web browsing?",                    opts: ["A type of malware","A cached image","A small data file stored by websites","A browser plugin"], ans: 2 },
      { q: "What does IDE stand for in software development?",     opts: ["Integrated Development Environment","Internet Data Exchange","Indexed Design Engine","Internal Debugging Editor"], ans: 0 },
      { q: "What is open-source software?",                        opts: ["Free to use always","Software whose code is publicly available","Developed by governments","Only for Linux"], ans: 1 },
      { q: "What is the function of an operating system?",         opts: ["Run only games","Manage hardware and software resources","Only store files","Only provide internet access"], ans: 1 },
    ],
    hard: [
      { q: "What is the time complexity of binary search?",         opts: ["O(n)","O(n2)","O(log n)","O(1)"],                 ans: 2 },
      { q: "What design pattern does MVC stand for?",               opts: ["Module-View-Controller","Model-View-Controller","Model-Validation-Controller","Managed-View-Component"], ans: 1 },
      { q: "What is a race condition in programming?",              opts: ["A performance benchmark","An error from unsynchronized concurrent access","A type of memory leak","A CPU overheating issue"], ans: 1 },
      { q: "Which hashing algorithm produces a 256-bit digest?",    opts: ["MD5","SHA-1","SHA-256","CRC32"],                  ans: 2 },
      { q: "What does SOLID stand for in software engineering (first word)?", opts: ["Single","Solid","Simplified","Structured"], ans: 0 },
      { q: "What is a deadlock in operating systems?",              opts: ["CPU overload","Two processes blocked waiting on each other","Memory overflow","Network timeout"], ans: 1 },
      { q: "What does REST stand for in APIs?",                     opts: ["Remote Execution State Transfer","Representational State Transfer","Reliable Endpoint Standard Transfer","Recursive Entry State Transport"], ans: 1 },
      { q: "What does overfitting mean in machine learning?",       opts: ["Model too simple","Model works on training data but fails on new data","Data has too many features","Training takes too long"], ans: 1 },
      { q: "What is the CAP theorem in distributed systems?",       opts: ["Capacity-Availability-Performance","Consistency-Availability-Partition tolerance","Caching-Access-Persistence","Concurrency-Atomicity-Pipelining"], ans: 1 },
      { q: "What does TCP stand for?",                              opts: ["Transfer Control Protocol","Transmission Control Protocol","Transport Connection Protocol","Tunneled Communication Protocol"], ans: 1 },
      { q: "What is memoization in programming?",                   opts: ["Deleting unused variables","Caching function results to avoid recomputation","Compiling code ahead of time","Encrypting data in memory"], ans: 1 },
      { q: "Which sorting algorithm has the best average-case time complexity?", opts: ["Bubble sort","Insertion sort","Merge sort","Quick sort O(n log n)"], ans: 3 },
    ],
  },
};

/* ─── DIFFICULTY CONFIG ─── */
const DIFF_CONFIG = {
  easy:   { time: 20, pts: 10 },
  medium: { time: 15, pts: 20 },
  hard:   { time: 10, pts: 30 },
};

/* ─── STATE ─── */
let state = {
  category: 'general',
  difficulty: 'easy',
  questions: [],
  currentIndex: 0,
  score: 0,
  correct: 0,
  wrong: 0,
  skipped: 0,
  streak: 0,
  bestStreak: 0,
  timeLeft: 15,
  timerInterval: null,
  answers: [],
  _currentQData: null,
  _currentShuffled: null,
  _correctDisplayIdx: 0,
};

/* ─── SCREEN HELPERS ─── */
const screens = {
  welcome: document.getElementById('screen-welcome'),
  quiz:    document.getElementById('screen-quiz'),
  result:  document.getElementById('screen-result'),
  review:  document.getElementById('screen-review'),
};
function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

/* ─── WELCOME SETUP ─── */
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.category = btn.dataset.cat;
  });
});

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.difficulty = btn.dataset.diff;
  });
});

document.getElementById('btn-start').addEventListener('click', startQuiz);

/* ─── START QUIZ ─── */
function startQuiz() {
  const pool = [...QUESTIONS[state.category][state.difficulty]];
  shuffleArray(pool);
  state.questions    = pool.slice(0, 10);
  state.currentIndex = 0;
  state.score        = 0;
  state.correct      = 0;
  state.wrong        = 0;
  state.skipped      = 0;
  state.streak       = 0;
  state.bestStreak   = 0;
  state.answers      = [];

  const catLabels = { general: '🌍 General', science: '🔬 Science', history: '📜 History', tech: '💻 Tech' };
  document.getElementById('category-tag').textContent   = catLabels[state.category];
  document.getElementById('difficulty-tag').textContent = state.difficulty.charAt(0).toUpperCase() + state.difficulty.slice(1);
  document.getElementById('live-score').textContent     = 0;

  showScreen('quiz');
  loadQuestion();
}

/* ─── LOAD QUESTION ─── */
function loadQuestion() {
  if (state.currentIndex >= state.questions.length) { endQuiz(); return; }

  const qData = state.questions[state.currentIndex];
  const total  = state.questions.length;
  const cfg    = DIFF_CONFIG[state.difficulty];

  const pct = (state.currentIndex / total) * 100;
  document.getElementById('progress-bar').style.width   = pct + '%';
  document.getElementById('q-counter').textContent      = `${state.currentIndex + 1} / ${total}`;
  document.getElementById('q-number').textContent       = `Question ${String(state.currentIndex + 1).padStart(2, '0')}`;
  document.getElementById('question-text').textContent  = qData.q;

  const indices  = [0,1,2,3];
  const shuffled = shuffledIndices(indices);
  const newAnsIndex = shuffled.indexOf(qData.ans);

  const optGrid = document.getElementById('options-grid');
  optGrid.innerHTML = '';
  const labels = ['A','B','C','D'];

  shuffled.forEach((origIdx, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-label">${labels[i]}</span>${qData.opts[origIdx]}`;
    btn.addEventListener('click', () => handleAnswer(btn, origIdx === qData.ans, origIdx, newAnsIndex, qData));
    optGrid.appendChild(btn);
  });

  state._currentQData      = qData;
  state._currentShuffled   = shuffled;
  state._correctDisplayIdx = newAnsIndex;

  startTimer(cfg.time);
  updateStreakDisplay();
}

/* ─── HANDLE ANSWER ─── */
function handleAnswer(btn, isCorrect, chosenOrigIdx, correctDisplayIdx, qData) {
  clearInterval(state.timerInterval);
  disableOptions();

  const allBtns = document.querySelectorAll('.option-btn');

  if (isCorrect) {
    btn.classList.add('correct');
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    const bonus   = state.streak >= 3 ? Math.floor(state.streak / 3) * 5 : 0;
    const pts     = DIFF_CONFIG[state.difficulty].pts + bonus;
    state.score  += pts;
    state.correct++;
    document.getElementById('live-score').textContent = state.score;
    flashFeedback('correct');
  } else {
    btn.classList.add('wrong');
    allBtns[correctDisplayIdx].classList.add('correct');
    state.streak = 0;
    state.wrong++;
    flashFeedback('wrong');
  }

  state.answers.push({ q: qData.q, options: qData.opts, ans: qData.ans, userAns: chosenOrigIdx, skipped: false });
  updateStreakDisplay();
  setTimeout(nextQuestion, 1200);
}

/* ─── SKIP ─── */
document.getElementById('btn-skip').addEventListener('click', () => {
  clearInterval(state.timerInterval);
  disableOptions();
  const qData = state.questions[state.currentIndex];
  state.skipped++;
  state.streak = 0;
  state.answers.push({ q: qData.q, options: qData.opts, ans: qData.ans, userAns: null, skipped: true });
  updateStreakDisplay();
  setTimeout(nextQuestion, 400);
});

/* ─── NEXT ─── */
function nextQuestion() { state.currentIndex++; loadQuestion(); }

/* ─── TIMER ─── */
function startTimer(seconds) {
  state.timeLeft = seconds;
  const maxCirc  = 113;
  const ring     = document.getElementById('timer-ring');
  const text     = document.getElementById('timer-text');

  ring.style.stroke = 'var(--accent)';
  updateTimerUI(seconds, seconds, maxCirc, ring, text);

  state.timerInterval = setInterval(() => {
    state.timeLeft--;
    updateTimerUI(state.timeLeft, seconds, maxCirc, ring, text);
    if (state.timeLeft <= 3) ring.style.stroke = 'var(--red)';
    if (state.timeLeft <= 0) {
      clearInterval(state.timerInterval);
      disableOptions();
      const qData = state.questions[state.currentIndex];
      document.querySelectorAll('.option-btn')[state._correctDisplayIdx].classList.add('correct');
      state.wrong++;
      state.streak = 0;
      state.answers.push({ q: qData.q, options: qData.opts, ans: qData.ans, userAns: -1, skipped: false, timedOut: true });
      updateStreakDisplay();
      flashFeedback('wrong');
      setTimeout(nextQuestion, 1200);
    }
  }, 1000);
}

function updateTimerUI(current, total, maxCirc, ring, text) {
  ring.style.strokeDashoffset = maxCirc - (current / total) * maxCirc;
  text.textContent = current;
}

/* ─── HELPERS ─── */
function disableOptions() { document.querySelectorAll('.option-btn').forEach(b => b.disabled = true); }

function flashFeedback(type) {
  const overlay = document.getElementById('feedback-overlay');
  overlay.className = 'feedback-overlay ' + (type === 'correct' ? 'correct-flash' : 'wrong-flash');
  setTimeout(() => { overlay.className = 'feedback-overlay'; }, 400);
}

function updateStreakDisplay() {
  const el = document.getElementById('streak-display');
  if (state.streak >= 2) {
    el.style.display = 'flex';
    document.getElementById('streak-count').textContent = state.streak;
  } else { el.style.display = 'none'; }
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}
function shuffledIndices(arr) { const c = [...arr]; shuffleArray(c); return c; }

/* ─── END QUIZ ─── */
function endQuiz() {
  clearInterval(state.timerInterval);
  const total = state.questions.length;
  const pct   = Math.round((state.correct / total) * 100);

  let rank, badge;
  if (pct === 100)    { rank = 'Perfect Score!';  badge = '🏆'; }
  else if (pct >= 80) { rank = 'Champion';        badge = '🥇'; }
  else if (pct >= 60) { rank = 'Scholar';         badge = '🥈'; }
  else if (pct >= 40) { rank = 'Apprentice';      badge = '🥉'; }
  else if (pct >= 20) { rank = 'Rookie';          badge = '📚'; }
  else                { rank = 'Keep Practicing'; badge = '💪'; }

  document.getElementById('result-badge').textContent  = badge;
  document.getElementById('result-rank').textContent   = rank;
  document.getElementById('result-score').textContent  = `${state.correct} / ${total}`;
  document.getElementById('result-pts').textContent    = `${state.score} points earned`;
  document.getElementById('stat-correct').textContent  = state.correct;
  document.getElementById('stat-wrong').textContent    = state.wrong;
  document.getElementById('stat-skipped').textContent  = state.skipped;
  document.getElementById('stat-streak').textContent   = state.bestStreak;

  showScreen('result');
}

/* ─── RESULT ACTIONS ─── */
document.getElementById('btn-restart').addEventListener('click', () => showScreen('welcome'));

document.getElementById('btn-home-result').addEventListener('click', () => showScreen('welcome'));

document.getElementById('btn-review').addEventListener('click', () => {
  buildReview();
  showScreen('review');
});

document.getElementById('btn-back').addEventListener('click', () => showScreen('result'));

document.getElementById('btn-home-review').addEventListener('click', () => showScreen('welcome'));

/* ─── REVIEW ─── */
function buildReview() {
  const list = document.getElementById('review-list');
  list.innerHTML = '';

  state.answers.forEach((item, i) => {
    const isSkip    = item.skipped;
    const isTimeout = item.timedOut;
    const isCorrect = !isSkip && !isTimeout && item.userAns === item.ans;

    let statusClass, statusIcon;
    if (isSkip || isTimeout) { statusClass = 'skip'; statusIcon = isTimeout ? '⏱' : '—'; }
    else if (isCorrect)       { statusClass = 'ok';   statusIcon = '✓'; }
    else                      { statusClass = 'bad';  statusIcon = '✗'; }

    const userAnsText    = isSkip ? (isTimeout ? 'Time ran out' : 'Skipped') : (item.options[item.userAns] || '—');
    const correctAnsText = item.options[item.ans];

    const div = document.createElement('div');
    div.className = 'review-item';
    div.innerHTML = `
      <div class="review-item-header">
        <span class="review-status ${statusClass}">${statusIcon}</span>
        <p class="review-q">Q${i + 1}. ${item.q}</p>
      </div>
      <div class="review-answers">
        <span class="review-your-ans ${isCorrect ? 'correct-ans' : ''}">
          <b>Your answer:</b> ${userAnsText}
        </span>
        ${!isCorrect ? `<span class="review-correct-ans"><b>Correct answer:</b> ${correctAnsText}</span>` : ''}
      </div>`;
    list.appendChild(div);
  });
}
