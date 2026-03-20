import { useState } from 'react';
import { Link } from 'react-router';
import { Leaf, Mail, Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';

export default function RegisterScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('maria123');
  const [confirmPassword, setConfirmPassword] = useState('maria1234');
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const passwordsMatch = password === confirmPassword;
  const showPasswordError = touched.confirmPassword && !passwordsMatch && confirmPassword.length > 0;

  const handleConfirmPasswordBlur = () => {
    setTouched({ ...touched, confirmPassword: true });
  };

  return (
    <div className="w-[390px] h-[844px] bg-[#faf8f5] flex flex-col px-6 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <Leaf className="w-6 h-6 text-[#7a956b]" strokeWidth={1.5} />
        <span
          className="text-[#7a956b] text-2xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          polbite
        </span>
      </div>

      {/* Title */}
      <div className="mb-8">
        <h1
          className="text-[#2d3319] text-4xl mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Crea tu cuenta
        </h1>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-4 flex-1">
        {/* Name field */}
        <div className="flex flex-col gap-2">
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6b7058]"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-[#f3f1ed] rounded-2xl border border-[rgba(122,149,107,0.2)] text-[#2d3319] placeholder:text-[#6b7058] focus:outline-none focus:ring-2 focus:ring-[#7a956b] focus:border-transparent transition-all"
            />
          </div>
        </div>

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

        {/* Confirm password field with error */}
        <div className="flex flex-col gap-2">
          <div className="relative">
            <Lock
              className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${
                showPasswordError ? 'text-[#d4183d]' : 'text-[#6b7058]'
              }`}
              strokeWidth={1.5}
            />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={handleConfirmPasswordBlur}
              className={`w-full pl-12 pr-14 py-4 bg-[#f3f1ed] rounded-2xl border text-[#2d3319] placeholder:text-[#6b7058] focus:outline-none transition-all ${
                showPasswordError
                  ? 'border-[#d4183d] focus:ring-2 focus:ring-[#d4183d]'
                  : 'border-[rgba(122,149,107,0.2)] focus:ring-2 focus:ring-[#7a956b] focus:border-transparent'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                showPasswordError
                  ? 'text-[#d4183d] hover:text-[#b01434]'
                  : 'text-[#6b7058] hover:text-[#7a956b]'
              }`}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" strokeWidth={1.5} />
              ) : (
                <Eye className="w-5 h-5" strokeWidth={1.5} />
              )}
            </button>
          </div>
          {showPasswordError && (
            <div className="flex items-center gap-2 px-4">
              <AlertCircle className="w-4 h-4 text-[#d4183d]" strokeWidth={1.5} />
              <span className="text-[#d4183d] text-sm">
                Las contraseñas no coinciden
              </span>
            </div>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-4 bg-[#7a956b] text-white rounded-[32px] mt-6 hover:bg-[#6a8459] active:scale-[0.98] transition-all shadow-lg shadow-[rgba(122,149,107,0.3)]"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Crear cuenta
        </button>

        {/* Login link */}
        <div className="mt-auto text-center pb-4">
          <Link
            to="/login"
            className="text-[#6b7058] hover:text-[#7a956b] transition-colors"
          >
            ¿Ya tienes cuenta?{' '}
            <span className="text-[#7a956b]">Inicia sesión</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
