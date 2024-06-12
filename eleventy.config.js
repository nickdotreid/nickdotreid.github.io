module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('layout', 'nickreid.njk');
  eleventyConfig.addPassthroughCopy("./nickreid*");
  eleventyConfig.addWatchTarget("nickreid.css");


  

  // Can be sync or async
  eleventyConfig.addTransform("transform-name", async function (content) {
    //console.log(this.page.inputPath);
    console.log(this.page.outputPath);

    regex = new RegExp(/href="\.\/(.*)\.md"/)
    match = regex.exec(content);
    while (match) {
      console.log(match[0], match[1]);
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
