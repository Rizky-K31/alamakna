import { allBrewMethods } from '../utils/flavorCalculator';

export default function BrewTable({ selectedGrind }) {
  return (
    <div className="grid grid-cols-3 border border-navbar">
      {allBrewMethods.map((method) => {
        const isMatch = method.grind === selectedGrind;
        return (
          <div
            key={method.name}
            className={`flex min-h-12 items-center justify-center border-b border-r border-navbar px-2 text-center transition-colors ${
              isMatch ? 'bg-accent/70 text-dark' : 'bg-transparent text-navbar'
            }`}
          >
            <span className="font-azeret text-[10px] font-bold">{method.name}</span>
          </div>
        );
      })}
    </div>
  );
}
