import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import beansBg from '../assets/beans.webp';
import footerBg from '../assets/footer.webp';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, login, signup, resetPassword } = useAuth();
  const location = useLocation();

  const isSignup = mode === 'signup';
  const isReset = mode === 'reset';

  if (user) {
    return <Navigate to={location.state?.redirectTo || location.state?.from?.pathname || '/backend'} replace />;
  }

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');

    try {
      if (isSignup) {
        await signup(email, password);
        setMessage('Akun berhasil dibuat. Cek email jika Supabase meminta konfirmasi.');
      } else if (isReset) {
        await resetPassword(email);
        setMessage('Link reset password sudah dikirim jika email terdaftar.');
      } else {
        await login(email, password);
      }
    } catch (error) {
      setMessage(error.message || 'Terjadi kesalahan. Coba lagi.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      className="relative flex min-h-[calc(100vh-56px)] items-center justify-center overflow-hidden px-5 py-10 md:px-12"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.70), rgba(55,48,40,0.62)), url(${beansBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-black/45 shadow-2xl backdrop-blur-md lg:grid-cols-[0.92fr_1fr]">
        <section
          className="relative hidden min-h-[640px] flex-col justify-between overflow-hidden p-10 lg:flex"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.76)), url(${footerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Link to="/#home" className="relative z-10 font-gochi text-4xl text-white">
            ALAMAKNA
          </Link>

          <div className="relative z-10">
            <p className="mb-3 font-azeret text-xs uppercase tracking-[0.35em] text-accent">
              Coffee Lab Access
            </p>
            <h1 className="font-gochi text-7xl leading-none text-white">
              Sign In
            </h1>
            <p className="mt-5 max-w-sm font-akshar text-lg leading-relaxed text-white/78">
              Masuk untuk membuka simulasi blend, mengatur rasio Arabika dan Robusta, lalu menemukan profil rasa kopi terbaikmu.
            </p>
          </div>
        </section>

        <section className="flex min-h-[640px] items-center justify-center px-5 py-10 md:px-10">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <Link to="/#home" className="font-gochi text-4xl text-white lg:hidden">
                ALAMAKNA
              </Link>
              <h2 className="mt-5 font-concert text-4xl text-white md:text-5xl">
                {isSignup ? 'Buat Akun' : isReset ? 'Reset Password' : 'Welcome Back'}
              </h2>
              <p className="mt-2 font-akshar text-base text-text-muted">
                {isSignup
                  ? 'Daftar untuk mulai menggunakan simulasi blend.'
                  : isReset
                    ? 'Masukkan email untuk menerima tautan reset.'
                    : 'Masuk untuk lanjut ke simulasi blend ALAMAKNA.'}
              </p>
            </div>

            {!isReset && (
              <div className="mb-7 grid grid-cols-2 overflow-hidden rounded-xl border border-white/10 bg-white/5 p-1">
                {[
                  ['login', 'Sign In'],
                  ['signup', 'Sign Up'],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => changeMode(value)}
                    className={`rounded-lg py-3 font-azeret text-sm font-bold transition-colors ${
                      mode === value ? 'bg-accent text-dark' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
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

              {!isReset && (
                <label className="block">
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <span className="font-azeret text-xs font-bold uppercase tracking-[0.18em] text-white/70">
                      Password
                    </span>
                    {!isSignup && (
                      <button
                        type="button"
                        onClick={() => changeMode('reset')}
                        className="font-akshar text-sm text-accent transition-colors hover:text-accent-hover"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    minLength={6}
                    placeholder="Minimal 6 karakter"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/10 px-4 font-akshar text-base text-white outline-none transition-colors placeholder:text-white/35 focus:border-accent"
                  />
                </label>
              )}

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
                {submitting ? 'Memproses...' : isSignup ? 'Create Account' : isReset ? 'Send Reset Link' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              {isReset ? (
                <button
                  type="button"
                  onClick={() => changeMode('login')}
                  className="font-akshar text-sm text-white/70 transition-colors hover:text-white"
                >
                  Kembali ke sign in
                </button>
              ) : (
                <p className="font-akshar text-sm text-white/65">
                  {isSignup ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
                  <button
                    type="button"
                    onClick={() => changeMode(isSignup ? 'login' : 'signup')}
                    className="font-semibold text-accent transition-colors hover:text-accent-hover"
                  >
                    {isSignup ? 'Sign in' : 'Sign up'}
                  </button>
                </p>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
