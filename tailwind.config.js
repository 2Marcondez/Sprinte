/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        'custom-green': '#9AD264',
        // Se você quiser adicionar a paleta de cores "neutral"
        neutral: {
          50: '#F5F5F5', // Ou a cor que você achar melhor
          100: '#E0E0E0',
          200: '#BDBDBD',
          500: '#9E9E9E',
           zinc: {
          100: '#F4F4F5', // Cor do `zinc-100`
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#2E2E34',
          900: '#1F1F23',
          // Você pode continuar estendendo a paleta conforme necessário
        },
      },
    },
  },
  plugins: [],
}
}