/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./public/index.html"],
  mode: "jit",
  important: true,
  theme: {
    extend: {
      backgroundColor: (theme) => ({
        ...theme("colors"),
      }),
      boxShadow: {
        DEFAULT: "0 2px 6px 0 rgba(0, 0, 0, 0.15)",
        5: "5px 5px 5px rgba(0, 0, 0, 0.35)",
        7: "1px 3px 12px 1px rgba(0, 0, 0, 0.5)",
        md: "0px 2px 12px #00000029",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.01)",
        xl: "0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08)",
        "2xl": "1px 5px 35px 1px #949494",
      },
      colors: {
        green: {
          DEFAULT: "#1E5C34",
        },
        "primary-green": "#1E5C34",
        "primary-red": "#D71925",
        "primary-gray": "#F8F6F3",
        "second-gray": "#A0A0A0",
        "primary-orange": "#F89A3E",
        "primary-yellow": "#FED45C",
        "primary-black": "#444444",
      },
      outline: {
        blue: "2px solid rgba(0, 112, 244, 0.5)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        apoc: ["var(--font-apoc)"],
      },
      fontSize: {
        13: ["13px", { lineHeight: "1.5" }],
      },
      keyframes: {
        ringring: {
          "10%, 90%": { transform: "translate3d(-1px, 0, 0)" },
          "20%, 80%": { transform: "translate3d(2px, 0, 0)" },
          "30%, 50%, 70%": { transform: "translate3d(-4px, 0, 0)" },
          "40%, 60%": { transform: "translate3d(4px, 0, 0)" },
        },
      },
      animation: {
        ringring: "ringring 1s linear",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      screens: {
        mobile: { max: "640px" },
        tablet: { max: "768px" },
      },
      borderRadius: {
        DEFAULT: "4px",
        10: "10px",
        20: "20px",
      },
      spacing: {
        13: "52px",
        18: "72px",
      },
      maxHeight: {
        auto: "auto",
      },
      minHeight: {
        auto: "auto",
      },
      minWidth: {
        "1/3": "33.3%",
        "1/2": "50%",
      },
      zIndex: {
        1: "1",
      },
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {
      margin: ["first", "last"],
      borderWidth: ["first", "last"],
      padding: ["first", "last"],
      textColor: ["active"],
      animation: ["hover", "group-hover"],
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    // require('@tailwindcss/forms'),
  ],
};
