module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('layout', 'nickreid.njk');
  eleventyConfig.addPassthroughCopy("./nickreid*");
  eleventyConfig.addWatchTarget("nickreid.css");

  eleventyConfig.addFilter("slugifyURL", function(value){
    console.log('slugify-url filter', value);
    const slugify = eleventyConfig.getFilter('slugify');
    return value.split('/').map((v) => {
      if (v=='index') {
         return '';
      } else {
         return slugify(v);
      }
    }).join('/');
  });

  eleventyConfig.addGlobalData('permalink', "{{page.filePathStem|slugifyURL}}/");

  eleventyConfig.addTransform("trim-md-path", async function (content) {
    regex = new RegExp(/href="\.\/(.*)\.md"/)
    match = regex.exec(content);
    const slugifyURL = eleventyConfig.getFilter('slugifyURL');
    while (match) {
      content = match.input.substring(0, match.index)
      + 'href="' + slugifyURL(match[1].trim()) + '/"'
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
