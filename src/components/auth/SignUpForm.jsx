import PasswordInput from './PasswordInput';

export default function SignUpForm({
  email,
  message,
  onChangeMode,
  onSubmit,
  password,
  setEmail,
  setPassword,
  setShowPassword,
  setUsername,
  showPassword,
  submitting,
  username,
}) {
  return (
    <>
      <div className="mb-8 text-center lg:text-left">
        <h2 className="mt-5 font-concert text-4xl text-white md:text-5xl">
          Buat Akun
        </h2>
        <p className="mt-2 font-akshar text-base text-text-muted">
          Daftar untuk mulai menggunakan simulasi blend.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <label className="block">
          <span className="font-azeret text-xs font-bold uppercase tracking-[0.18em] text-white/70">
            Username
          </span>
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
            minLength={3}
            placeholder="Nama pengguna"
            className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/10 px-4 font-akshar text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="font-azeret text-xs font-bold uppercase tracking-[0.18em] text-white/70">
            Email
          </span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            placeholder="nama@email.com"
            className="mt-2 h-12 w-full rounded-xl border border-white/10 bg-white/10 px-4 font-akshar text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent"
          />
        </label>

        <label className="block">
          <span className="mb-2 block font-azeret text-xs font-bold uppercase tracking-[0.18em] text-white/70">
            Password
          </span>
          <PasswordInput
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            onToggleVisibility={() => setShowPassword((current) => !current)}
          />
        </label>

        {message && (
          <p className="rounded-xl border border-accent/25 bg-accent/10 px-4 py-3 font-akshar text-sm leading-snug text-text-cream">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="h-13 w-full rounded-xl bg-accent font-azeret text-sm font-black uppercase tracking-[0.18em] text-dark shadow-lg shadow-accent/20 transition-all hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Memproses...' : 'Create Account'}
        </button>
      </form>

      <p className="mt-6 text-center font-akshar text-sm text-white/65">
        Sudah punya akun?{' '}
        <button
          type="button"
          onClick={() => onChangeMode('login')}
          className="font-semibold text-accent transition-colors hover:text-accent-hover"
        >
          Sign in
        </button>
      </p>
    </>
  );
}
