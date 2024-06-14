module.exports = function(eleventyConfig) {
  eleventyConfig.addGlobalData('layout', 'nickreid.njk');
  eleventyConfig.addPassthroughCopy("./nickreid*");
  eleventyConfig.addWatchTarget("nickreid.css");


  const slugify = eleventyConfig.getFilter("slugify");
  eleventyConfig.addFilter("slugifyURL", function(value){
    return value.split('/').map((v) => {
      if (v=='index') {
         return '';
      } else {
         return slugify(v);
      }
    }).join('/');
  });

  let obsidianLinks = {};
  function parseObsidianLink(text) {
    let link = text.split("|")[0].trim();
    let linkText = link;
    if (text.split("|")[1].trim()) {
      linkText = text.split("|")[1].trim();
    }
    console.log(obsidianLinks, link);
    if (obsidianLinks[link]) {
      return '<a href="' + obsidianLinks[link] + '">'+ linkText +'</a>';
    } else {
      return linkText;
    }
  }

  eleventyConfig.addGlobalData('permalink', "{{page.filePathStem|slugifyURL}}/");

  eleventyConfig.on("eleventy.contentMap", function({inputPathToUrl}) { 
    console.log('content map', inputPathToUrl);
    Object.keys(inputPathToUrl).forEach(function(_key) {
      console.log(_key, inputPathToUrl[_key][0]);
      let bits = _key.split('/');
      console.log("** " + bits.length, bits);
      let link = bits[bits.length-1].replace('.md','');
      obsidianLinks[link] = inputPathToUrl[_key]
    });
  });

  eleventyConfig.addTransform("trim-md-path", async function (content) {
    regex = new RegExp(/\[\[(.*)\]\]/)
    match = regex.exec(content);
    const slugifyURL = eleventyConfig.getFilter('slugifyURL');
    while (match) {
      content = match.input.substring(0, match.index)
      + parseObsidianLink(match[1].trim())
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
