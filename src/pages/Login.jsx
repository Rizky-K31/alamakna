import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import beansBg from '../assets/beans.webp';
import footerBg from '../assets/footer.webp';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';
import SignInForm from '../components/auth/SignInForm';
import SignUpForm from '../components/auth/SignUpForm';
import { useAuth } from '../context/useAuth';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user, login, signup, resetPassword } = useAuth();
  const location = useLocation();

  const isSignup = mode === 'signup';
  const isReset = mode === 'reset';

  if (user) {
    return <Navigate to={location.state?.redirectTo || location.state?.from?.pathname || '/#simulation'} replace />;
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
        await signup(email, password, username.trim());
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

  const formProps = {
    email,
    message,
    onChangeMode: changeMode,
    onSubmit: handleSubmit,
    password,
    setEmail,
    setPassword,
    setShowPassword,
    showPassword,
    submitting,
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
            <div className="mb-8 text-center lg:hidden">
              <Link to="/#home" className="font-gochi text-4xl text-white lg:hidden">
                ALAMAKNA
              </Link>
            </div>

            {isSignup && (
              <SignUpForm
                {...formProps}
                setUsername={setUsername}
                username={username}
              />
            )}

            {isReset && (
              <ResetPasswordForm
                email={email}
                message={message}
                onChangeMode={changeMode}
                onSubmit={handleSubmit}
                setEmail={setEmail}
                submitting={submitting}
              />
            )}

            {!isSignup && !isReset && <SignInForm {...formProps} />}
          </div>
        </section>
      </div>
    </main>
  );
}
