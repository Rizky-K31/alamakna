import { grindData as fallbackGrindData } from '../utils/flavorCalculator';

export default function GrindSize({ grindData = fallbackGrindData, selectedGrind, onGrindChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {grindData.map((grind) => (
        <button
          key={grind.id}
          type="button"
          onClick={() => onGrindChange(grind.id)}
          className={`min-h-[78px] rounded-[8px] border px-3 py-3 text-center transition-all duration-300 ${
            selectedGrind === grind.id
              ? 'border-navbar bg-navbar text-white shadow-lg shadow-navbar/25'
              : 'border-navbar/15 bg-white/60 text-navbar hover:-translate-y-1 hover:border-accent/60 hover:bg-white'
          }`}
        >
          <span className="block font-gochi text-3xl leading-none">{grind.label}</span>
          <span className="mt-1 block font-azeret text-[10px] font-bold uppercase tracking-[0.12em]">
            {grind.labelId}
          </span>
        </button>
      ))}
    </div>
  );
}
