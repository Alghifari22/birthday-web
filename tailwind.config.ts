import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: { extend: { colors: { ink: '#171311', paper: '#eadfce', wine: '#70443f', muted: '#b9a99b' } } },
  plugins: []
};
export default config;
