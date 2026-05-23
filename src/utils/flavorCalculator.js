export const blendData = [
  {
    ratio: '0/100',
    arabica: 0,
    robusta: 100,
    acidity: 2,
    body: 8,
    bitterness: 8,
    label: 'Bitter & Strong',
    desc: 'Rasa pahit sangat dominan dengan body tebal dan aftertaste yang kuat. Karakter Robusta terasa penuh, pekat, dan cenderung berat.',
  },
  {
    ratio: '10/90',
    arabica: 10,
    robusta: 90,
    acidity: 2,
    body: 8,
    bitterness: 8,
    label: 'Intense & Bitter',
    desc: 'Rasa sangat intens dengan dominasi pahit yang kuat. Body terasa penuh dan tebal, cocok untuk karakter kopi yang bold.',
  },
  {
    ratio: '20/80',
    arabica: 20,
    robusta: 80,
    acidity: 3,
    body: 7,
    bitterness: 7,
    label: 'Bold & earthy',
    desc: 'Rasa kuat dan tegas dengan karakter earthy yang menonjol. Pahit masih dominan, sedangkan keasaman terasa sangat rendah.',
  },
  {
    ratio: '30/70',
    arabica: 30,
    robusta: 70,
    acidity: 4,
    body: 7,
    bitterness: 7,
    label: 'Earthy',
    desc: 'Karakter Robusta masih cukup dominan dengan rasa pahit dan earthy. Namun, tambahan Arabika mulai memberi sedikit keasaman ringan pada rasa akhir.',
  },
  {
    ratio: '40/60',
    arabica: 40,
    robusta: 60,
    acidity: 4,
    body: 6,
    bitterness: 6,
    label: 'Rich & Complex',
    desc: 'Rasa mulai terasa lebih kompleks karena perpaduan body Robusta dan keasaman Arabika. Karakter pahit masih ada, tetapi tidak terlalu mendominasi.',
  },
  {
    ratio: '50/50',
    arabica: 50,
    robusta: 50,
    acidity: 5,
    body: 6,
    bitterness: 5,
    label: 'Balance',
    desc: 'Rasa berada pada titik seimbang antara asam, pahit, dan body. Arabika memberi kesan cerah, sedangkan Robusta memberi kekuatan dan ketebalan rasa.',
  },
  {
    ratio: '60/40',
    arabica: 60,
    robusta: 40,
    acidity: 6,
    body: 5,
    bitterness: 5,
    label: 'Balanced & Smooth',
    desc: 'Perpaduan rasa terasa seimbang dan lebih halus. Keasaman mulai lebih terasa, sementara pahit Robusta tetap memberi body yang cukup kuat.',
  },
  {
    ratio: '70/30',
    arabica: 70,
    robusta: 30,
    acidity: 6,
    body: 5,
    bitterness: 4,
    label: 'Smooth',
    desc: 'Rasa cenderung halus dengan keasaman yang lebih menonjol. Pahit mulai berkurang, sehingga menghasilkan rasa yang lebih ringan dan nyaman.',
  },
  {
    ratio: '80/20',
    arabica: 80,
    robusta: 20,
    acidity: 7,
    body: 4,
    bitterness: 4,
    label: 'Smooth & Bright',
    desc: 'Keasaman cerah mulai mendominasi dengan rasa yang halus dan ringan. Sentuhan Robusta masih memberi sedikit body agar rasa tidak terlalu tipis.',
  },
  {
    ratio: '90/10',
    arabica: 90,
    robusta: 10,
    acidity: 7,
    body: 4,
    bitterness: 3,
    label: 'Bright & Fruity',
    desc: 'Karakter Arabika sangat dominan dengan rasa cerah, ringan, dan cenderung fruity. Pahit sangat rendah, hanya memberi sedikit kedalaman rasa.',
  },
  {
    ratio: '100/0',
    arabica: 100,
    robusta: 0,
    acidity: 8,
    body: 4,
    bitterness: 3,
    label: 'Bright & Fruity',
    desc: 'Rasa cerah, ringan, dan fruity sangat menonjol. Body lebih ringan dengan tingkat pahit rendah, cocok untuk penikmat kopi yang menyukai rasa clean dan asam segar.',
  },
];

const getBlendData = (arabicaPercent, source = blendData) => {
  const nearestStep = Math.min(100, Math.max(0, Math.round(arabicaPercent / 10) * 10));
  return source.find((blend) => blend.arabica === nearestStep) || source.find((blend) => blend.arabica === 50) || blendData[5];
};

export function calculateFlavor(arabicaPercent, source) {
  const blend = getBlendData(arabicaPercent, source);

  return {
    acidity: blend.acidity * 10,
    body: blend.body * 10,
    bitterness: blend.bitterness * 10,
  };
}

export function getTasteLabel(arabicaPercent, source) {
  const blend = getBlendData(arabicaPercent, source);

  return {
    label: blend.label,
    desc: blend.desc,
  };
}

export const grindData = [
  {
    id: 'beans',
    label: 'Beans',
    labelId: 'Biji Kopi',
    brewMethods: [],
  },
  {
    id: 'coarse',
    label: 'Coarse',
    labelId: 'Kasar',
    brewMethods: ['French Press', 'Cold Brew', 'Chemex'],
  },
  {
    id: 'medium',
    label: 'Medium',
    labelId: 'Sedang',
    brewMethods: ['V60', 'Aeropress', 'Cupping', 'Vietnam Drip', 'Kalita Wave', 'V60 Switch'],
  },
  {
    id: 'fine',
    label: 'Fine',
    labelId: 'Halus',
    brewMethods: ['Espresso', 'Moka Pot', 'Turkish', 'Syphon', 'Tubruk', 'ROK Presso'],
  },
];

export const allBrewMethods = [
  { name: 'French Press', grind: 'coarse' },
  { name: 'Cold Brew', grindIds: ['coarse'] },
  { name: 'Chemex', grind: 'coarse' },
  { name: 'Cupping', grind: 'medium' },
  { name: 'Vietnam Drip', grind: 'medium' },
  { name: 'V60', grind: 'medium' },
  { name: 'Kalita Wave', grind: 'medium' },
  { name: 'Aeropress', grind: 'medium' },
  { name: 'V60 Switch', grind: 'medium' },
  { name: 'Syphon', grind: 'fine' },
  { name: 'Espresso', grind: 'fine' },
  { name: 'Moka Pot', grind: 'fine' },
  { name: 'Tubruk', grind: 'fine' },
  { name: 'Turkish', grind: 'fine' },
  { name: 'ROK Presso', grind: 'fine' },
];
