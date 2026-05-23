import { coffeeData } from '../data/coffeeData';
import { coffeeMapRegions } from '../data/flavorMapData';
import { allBrewMethods, blendData, grindData } from '../utils/flavorCalculator';
import { isSupabaseConfigured, supabase } from './supabase';

const orderByDisplayOrder = (items) =>
  [...items].sort((a, b) => (a.display_order ?? a.displayOrder ?? 0) - (b.display_order ?? b.displayOrder ?? 0));

const formatPercent = (value) => `${Number(value)}%`;

const requireRows = (result) => {
  if (result.error) {
    throw result.error;
  }

  return result.data || [];
};

export async function fetchCoffeeTypes() {
  if (!isSupabaseConfigured) {
    return coffeeData;
  }

  const [typesResult, originsResult, specsResult] = await Promise.all([
    supabase.from('coffee_types').select('*').order('display_order'),
    supabase.from('coffee_type_origins').select('*').order('display_order'),
    supabase.from('coffee_type_specs').select('*').order('display_order'),
  ]);

  const types = requireRows(typesResult);
  const origins = requireRows(originsResult);
  const specs = requireRows(specsResult);

  return types.reduce((result, type) => {
    result[type.id] = {
      name: type.name,
      profil: type.profile,
      rasa: type.flavor_notes,
      kafein: type.caffeine,
      tinggi: type.altitude,
      harga: type.price,
      asal: origins
        .filter((origin) => origin.coffee_type_id === type.id)
        .map((origin) => origin.name),
      deskripsi: type.description,
      imageKey: type.image_key,
      specs: specs
        .filter((spec) => spec.coffee_type_id === type.id)
        .map((spec) => ({ label: spec.label, value: spec.value })),
    };

    return result;
  }, {});
}

export async function fetchCoffeeMapRegions() {
  if (!isSupabaseConfigured) {
    return coffeeMapRegions;
  }

  const [regionsResult, notesResult] = await Promise.all([
    supabase.from('coffee_map_regions').select('*').order('display_order'),
    supabase.from('coffee_map_region_notes').select('*').order('display_order'),
  ]);

  const regions = requireRows(regionsResult);
  const notes = requireRows(notesResult);

  return regions.map((region) => ({
    id: region.id,
    name: region.name,
    x: formatPercent(region.x_percent),
    y: formatPercent(region.y_percent),
    color: region.color,
    notes: notes
      .filter((note) => note.region_id === region.id)
      .map((note) => note.note),
  }));
}

export const getLocalSimulationData = () => ({
  blendData,
  grindData,
  allBrewMethods,
});

export async function fetchSimulationData() {
  if (!isSupabaseConfigured) {
    return getLocalSimulationData();
  }

  const [blendResult, grindResult, brewResult, relationResult] = await Promise.all([
    supabase.from('blend_profiles').select('*').order('display_order'),
    supabase.from('grind_sizes').select('*').order('display_order'),
    supabase.from('brew_methods').select('*').order('display_order'),
    supabase.from('grind_size_brew_methods').select('*').order('display_order'),
  ]);

  const blends = requireRows(blendResult).map((blend) => ({
    ratio: blend.ratio,
    arabica: blend.arabica_percent,
    robusta: blend.robusta_percent,
    acidity: blend.acidity,
    body: blend.body,
    bitterness: blend.bitterness,
    label: blend.label,
    desc: blend.description,
  }));
  const relations = requireRows(relationResult).filter(
    (relation) => (
      relation.brew_method_id !== 'simpan-biji'
      && !(relation.grind_size_id === 'beans' && relation.brew_method_id === 'cold-brew')
    ),
  );
  const grinds = requireRows(grindResult).map((grind) => ({
    id: grind.id,
    label: grind.label,
    labelId: grind.label_id,
    imageKey: grind.image_key,
    brewMethods: relations
      .filter((relation) => relation.grind_size_id === grind.id)
      .map((relation) => relation.brew_method_id),
  }));
  const brews = requireRows(brewResult)
    .filter((brew) => brew.id !== 'simpan-biji')
    .map((brew) => ({
      id: brew.id,
      name: brew.name,
      imageKey: brew.image_key,
      grindIds: relations
        .filter((relation) => relation.brew_method_id === brew.id)
        .map((relation) => relation.grind_size_id),
    }));

  return {
    blendData: blends,
    grindData: grinds,
    allBrewMethods: brews,
  };
}

const fallbackOriginSlides = [
  {
    id: 'makale',
    name: 'Gunung Makale',
    location: ['Sulawesi Selatan,', 'Indonesia'],
    description: 'Dataran Tinggi Penghasil Biji Kopi Di Indonesia',
    imageKey: 'gunung_makale.webp',
  },
  {
    id: 'batur',
    name: 'Gunung Batur',
    location: ['Bali,', 'Indonesia'],
    description: 'Dataran Tinggi Penghasil Biji Kopi Di Indonesia',
    imageKey: 'gunung_batur.webp',
  },
  {
    id: 'rinjani',
    name: 'Gunung Rinjani',
    location: ['Nusa Tenggara Barat,', 'Indonesia'],
    description: 'Dataran Tinggi Penghasil Biji Kopi Di Indonesia',
    imageKey: 'gunung_rinjani.webp',
  },
];

export async function fetchOriginSlides() {
  if (!isSupabaseConfigured) {
    return fallbackOriginSlides;
  }

  const result = await supabase.from('origin_slides').select('*').order('display_order');

  return orderByDisplayOrder(requireRows(result)).map((origin) => ({
    id: origin.id,
    name: origin.name,
    location: [origin.location_line_1, origin.location_line_2],
    description: origin.description,
    altitude: origin.altitude,
    imageKey: origin.image_key,
  }));
}
