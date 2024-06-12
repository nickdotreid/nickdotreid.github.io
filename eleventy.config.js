module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('layout', 'nickreid.njk');
  eleventyConfig.addPassthroughCopy("./nickreid*");
  eleventyConfig.addWatchTarget("nickreid.css");


  eleventyConfig.addTransform("trim-md-path", async function (content) {
    regex = new RegExp(/href="\.\/(.*)\.md"/)
    match = regex.exec(content);
    while (match) {
      content = match.input.substring(0, match.index)
      + 'href="' + match[1].trim() + '/"'
      + match.input.substring(
        match.index + match[0].length,
        match.input.length
      );
      match = regex.exec(content);
    }
    return content;
  });


  // Return your Object options:
  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "../includes"
    }
  }
};
