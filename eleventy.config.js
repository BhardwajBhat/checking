module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  return {
    pathPrefix: process.env.GITHUB_ACTIONS === "true" ? "/checking/" : "/",
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
