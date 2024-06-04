module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('layout', 'nickreid.njk');
  eleventyConfig.addPassthroughCopy("./nickreid*");
  eleventyConfig.addWatchTarget("nickreid.css");

  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "../includes"
    }
  }
};
