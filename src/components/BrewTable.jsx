import { allBrewMethods } from '../utils/flavorCalculator';

export default function BrewTable({ selectedGrind }) {
  return (
    <div className="grid grid-cols-3 border border-navbar">
      {allBrewMethods.map((method, index) => {
        const isMatch = method.grind === selectedGrind;
        const isLastColumn = (index + 1) % 3 === 0;
        const isLastRow = index >= allBrewMethods.length - 3;

        return (
          <div
            key={method.name}
            className={`flex min-h-[64px] items-center justify-center border-navbar px-3 text-center transition-colors ${
              isLastColumn ? '' : 'border-r'
            } ${isLastRow ? '' : 'border-b'} ${
              isMatch ? 'bg-accent/80 text-dark' : 'bg-transparent text-navbar'
            }`}
          >
            <span className="font-gochi text-xl leading-none text-current md:text-2xl">
              {method.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
