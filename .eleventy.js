module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('layout', 'base.njk');
  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "./layouts"
    }
  }
};
