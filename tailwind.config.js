/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      colors:
      {
        purple:"#2A0C4E"
      },
      backgroundImage: {
        'visionflow-bg': "url('/assets/images/visionflowbg.jpeg')",
      },
      fontFamily:
      {
        lobster: ["Lobster", "serif"],
      },
    },
  },
  plugins: [],
}

