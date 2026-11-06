/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{ts,tsx}"],
   theme: {
      extend: {
         colors: {
            crema: "#FFF8F1",
            tinta: "#2B2140",
            rosa: { DEFAULT: "#F0568A", suave: "#FFE1EC", oscuro: "#C93A6C" },
            sol: { DEFAULT: "#FFC93C", suave: "#FFF1C9" },
            menta: { DEFAULT: "#3FB894", suave: "#D9F5EC" },
            cielo: { DEFAULT: "#4A9BEA", suave: "#DDEEFD" },
            lila: { DEFAULT: "#9B7BEA", suave: "#EEE6FF" },
            wsp: "#25D366",
         },
         fontFamily: {
            titulo: ['"Fredoka"', "system-ui", "sans-serif"],
            cuerpo: ['"Nunito"', "system-ui", "sans-serif"],
         },
         keyframes: {
            flotar: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
            caer: { "0%": { transform: "translateY(-10vh) rotate(0)" }, "100%": { transform: "translateY(110vh) rotate(540deg)" } },
         },
         animation: {
            flotar: "flotar 5s ease-in-out infinite",
            caer: "caer linear infinite",
         },
      },
   },
   plugins: [],
};
