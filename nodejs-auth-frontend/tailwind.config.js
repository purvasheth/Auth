module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        body: ["Merriweather"],
      },
    },
  },

  variants: {
    extend: {
      borderWidth: ["focus", "hover", "active"],
      backgroundColor: ["active", "disabled"],
      textColor: ["active", "disabled", "visited"],
      borderColor: ["disabled", "active", "hover", "focus"],
      padding: ["hover", "focus", "active"],
      outline: ["active", "focus"],
    },
  },
  plugins: [],
};
