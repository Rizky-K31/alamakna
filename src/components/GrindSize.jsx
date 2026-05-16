import { grindData } from '../utils/flavorCalculator';

export default function GrindSize({ selectedGrind, onGrindChange }) {
  return (
    <div className="grid grid-cols-2 border border-navbar md:grid-cols-4">
      {grindData.map((grind) => (
        <button
          key={grind.id}
          type="button"
          onClick={() => onGrindChange(grind.id)}
          className={`min-h-14 border-r border-navbar px-4 py-2 transition-colors last:border-r-0 ${
            selectedGrind === grind.id ? 'bg-accent text-dark' : 'bg-transparent text-navbar hover:bg-navbar/10'
          }`}
        >
          <span className="block font-azeret text-xs font-bold">{grind.label}</span>
          <span className="block font-azeret text-[10px]">({grind.labelId})</span>
        </button>
      ))}
    </div>
  );
}
