import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'electric-violet': {
          '50': '#fcf3ff',
          '100': '#f7e4ff',
          '200': '#f1cdff',
          '300': '#e5a6ff',
          '400': '#d66dff',
          '500': '#c736ff',
          '600': '#b910ff',
          '700': '#af02fe',
          '800': '#8907c2',
          '900': '#71079c',
          '950': '#4f0076',
      },
      
      }
    },
  },
  plugins: [
    // ...
    require('@tailwindcss/forms'),
  ],
}
export default config
