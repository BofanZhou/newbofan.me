import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Serif SC"', 'ui-serif', 'serif'],
        display: ['"Space Grotesk"', '"Noto Serif SC"', 'ui-sans-serif', 'sans-serif'],
      },
      colors: {
        ink: '#09090B',
        paper: '#FAFAFA',
        zincLine: '#E4E4E7',
        accent: '#2563EB',
        cyanSoft: '#DDF7F1',
        amberSoft: '#FFE9C7',
      },
      boxShadow: {
        lift: '0 18px 45px rgba(15, 23, 42, 0.10)',
      },
    },
  },
  plugins: [],
} satisfies Config
