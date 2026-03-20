import { useState } from 'react';
import { Link } from 'react-router';
import { Leaf, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <div className="w-[390px] h-[844px] bg-[#faf8f5] flex flex-col px-6 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <Leaf className="w-6 h-6 text-[#7a956b]" strokeWidth={1.5} />
        <span
          className="text-[#7a956b] text-2xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          polbite
        </span>
      </div>

      {/* Title */}
      <div className="mb-10">
        <h1
          className="text-[#2d3319] text-4xl mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Bienvenido de nuevo
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-5 flex-1">
        {/* Email field */}
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7058]"
              strokeWidth={1.5}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#f3f1ed] rounded-2xl border border-[rgba(122,149,107,0.2)] text-[#2d3319] placeholder:text-[#6b7058] focus:outline-none focus:ring-2 focus:ring-[#7a956b] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Password field */}
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7058]"
              strokeWidth={1.5}
            />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-14 py-4 bg-[#f3f1ed] rounded-2xl border border-[rgba(122,149,107,0.2)] text-[#2d3319] placeholder:text-[#6b7058] focus:outline-none focus:ring-2 focus:ring-[#7a956b] focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7058] hover:text-[#7a956b] transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Eye className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-[#7a956b] text-white rounded-[32px] mt-6 hover:bg-[#6a8459] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[rgba(122,149,107,0.3)] flex items-center justify-center gap-2"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" strokeWidth={1.5} />
              <span>Cargando...</span>
            </>
          ) : (
            'Iniciar sesión'
          )}
        </button>

        {/* Register link */}
        <div className="mt-auto text-center">
          <Link
            to="/register"
            className="text-[#6b7058] hover:text-[#7a956b] transition-colors"
          >
            ¿No tienes cuenta?{' '}
            <span className="text-[#7a956b]">Regístrate</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
