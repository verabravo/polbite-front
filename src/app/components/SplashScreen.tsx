import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Leaf } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-[390px] h-[844px] relative overflow-hidden bg-gradient-to-br from-[#7a956b] via-[#8fa882] to-[#7a956b] flex items-center justify-center">
      {/* Logo */}
      <div className="flex flex-col items-center gap-3 animate-[fadeIn_1s_ease-in-out]">
        <div className="relative">
          <Leaf className="w-16 h-16 text-white opacity-90" strokeWidth={1.5} />
        </div>
        <h1
          className="text-white text-6xl tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          polbite
        </h1>
      </div>
    </div>
  );
}
