import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        tajawal: ['Tajawal', 'sans-serif'],
        'reem-kufi': ['Reem Kufi', 'sans-serif'],
        'aref-ruqaa': ['Aref Ruqaa', 'serif'],
      },
      colors: {
        ivory: '#FBF7EF',
        cream: '#F3EBDA',
        'cream-deep': '#EADFC7',
        pine: '#24463A',
        'pine-soft': '#3A5C4D',
        sage: '#8FA98A',
        'sage-light': '#C5D2BD',
        apricot: '#E3A06B',
        'apricot-deep': '#D08B53',
        rose: '#D58B7C',
        gold: '#C7A968',
        ink: '#2C2A24',
        muted: '#6F6A5C',
      },
    },
  },
  plugins: [],
}

export default config
