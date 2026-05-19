/**
 * Kalkulasi profil rasa berdasarkan persentase Arabika
 */
export function calculateFlavor(arabicaPercent) {
  const robusta = 100 - arabicaPercent;

  return {
    acidity: Math.round(arabicaPercent * 0.85 + robusta * 0.15),
    body: Math.round(arabicaPercent * 0.3 + robusta * 0.85),
    bitterness: Math.round(arabicaPercent * 0.15 + robusta * 0.8),
  };
}

/**
 * Tentukan label dan deskripsi rasa
 */
export function getTasteLabel(arabicaPercent) {
  if (arabicaPercent >= 80)
    return {
      label: 'Bright & Fruity',
      desc: 'Keasaman cerah mendominasi dengan sentuhan buah-buahan. Body ringan, cocok untuk penikmat kopi yang suka rasa clean dan segar.',
    };
  if (arabicaPercent >= 60)
    return {
      label: 'Balanced & Smooth',
      desc: 'Perpaduan seimbang antara keasaman dan body. Rasa halus dengan sedikit sentuhan pahit di akhir.',
    };
  if (arabicaPercent >= 40)
    return {
      label: 'Rich & Complex',
      desc: 'Body mulai terasa kuat dengan kompleksitas rasa. Keasaman masih terasa namun diperkaya oleh karakter earthy Robusta.',
    };
  if (arabicaPercent >= 20)
    return {
      label: 'Bold & Earthy',
      desc: 'Rasa kuat dan tegas dengan body penuh. Karakter earthy dan pahit mendominasi, keasaman sangat minimal.',
    };
  return {
    label: 'Intense & Bitter',
    desc: 'Rasa sangat kuat dengan pahit yang mendominasi. Body sangat penuh, ideal untuk espresso bold.',
  };
}

/**
 * Data grind size dan rekomendasi brew
 */
export const grindData = [
  {
    id: 'beans',
    label: 'Beans',
    labelId: 'Biji Kopi',
    brewMethods: ['Cold Brew', 'Simpan Biji'],
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

/**
 * Semua brew methods dengan grind size mapping
 */
export const allBrewMethods = [
  { name: 'French Press', grind: 'coarse' },
  { name: 'Cold Brew', grind: 'coarse' },
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
