/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        gradientNavBar: "linear-gradient(90deg,#d4d6e2,#00e9ee80,#00e9ee)",
        gradientNavBarMobile:
          "linear-gradient(90deg,#00e9ee95,#00e9ee,#00e9ee)",
        sideBar: "url('./assets/waves/homeWave.png')",
        companies_divider: "url('./assets/companies/img_video.png')",
        companies_register: "url('./assets/companies/register_companies.png')",
      },
      backgroundSize: {
        full: "100% 100%",
      },
      backgroundColor: {
        violet: "#422a79",
        "light-violet": "#b08fde",
        ocean: "#00e9ee",
        "light-gray": "#f5f5f5",
        "light-black": "#00000070",
      },
      colors: {
        violet: "#422a79",
        "light-violet": "#b08fde",
        ocean: "#00e9ee",
        "light-gray": "#f5f5f5",
        "light-black": "#00000070",
      },
      keyframes: {
        fadeIn: {
          from: {
            transform: "translateY(15%)",
            opacity: "0%",
          },
          to: {
            transform: "translateY(0)",
            opacity: "100%",
          },
        },
        fadeInLeftImage: {
          from: {
            transform: "translateX(75%)",
            opacity: "0%",
          },
          to: {
            transform: "translateX(0)",
            opacity: "100%",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeInLeftImage: "fadeInLeftImage 1s ease-in-out",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
