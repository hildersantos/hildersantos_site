module.exports = {
  sourceMap: true,
  plugins: {
    autoprefixer: {
      browsers: ["last 2 versions", "> 2% in GB", "IE 11"]
    },
    "postcss-font-magician": {
      foundries: "google"
    }
  }
};
