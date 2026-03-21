/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,jsx,ts,tsx}',
    './src/ui/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#7a956b',
        'primary-hover': '#6a8459',
        secondary: '#d07654',
        accent: '#e8945f',
        background: '#faf8f5',
        foreground: '#2d3319',
        muted: '#e8e5df',
        'muted-foreground': '#6b7058',
        card: '#ffffff',
        'card-border': '#e8e5df',
        'input-bg': '#f3f1ed',
        'input-border': 'rgba(122,149,107,0.2)',
        destructive: '#d4183d',
        'sage-green': '#8fa882',
        'dark-olive': '#4A7C59',
      },
      fontFamily: {
        serif: ['DMSerifDisplay-Regular'],
        sans: ['Outfit-Regular'],
        'sans-medium': ['Outfit-Medium'],
        'sans-semibold': ['Outfit-SemiBold'],
        'sans-bold': ['Outfit-Bold'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '8px',
        md: '8px',
        lg: '10px',
        xl: '14px',
        '2xl': '24px',
        '3xl': '30px',
        pill: '32px',
      },
    },
  },
  plugins: [],
};
