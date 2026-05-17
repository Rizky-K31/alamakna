import { grindData } from '../utils/flavorCalculator';

export default function GrindSize({ selectedGrind, onGrindChange }) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {grindData.map((grind) => (
        <button
          key={grind.id}
          type="button"
          onClick={() => onGrindChange(grind.id)}
          className={`min-h-[74px] rounded-[8px] border px-4 py-3 text-center transition-all ${
            selectedGrind === grind.id
              ? 'border-accent bg-accent text-dark shadow-lg shadow-accent/25'
              : 'border-navbar/15 bg-white/55 text-navbar hover:border-accent/60 hover:bg-white'
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
