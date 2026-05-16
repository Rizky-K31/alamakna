export default function PasswordInput({
  onChange,
  onToggleVisibility,
  showPassword,
  value,
}) {
  return (
    <div className="relative">
      <input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        minLength={6}
        placeholder="Minimal 6 karakter"
        className="h-12 w-full rounded-xl border border-white/10 bg-white/10 px-4 pr-20 font-akshar text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent"
      />
      <button
        type="button"
        onClick={onToggleVisibility}
        className="absolute right-4 top-1/2 -translate-y-1/2 font-akshar text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}
