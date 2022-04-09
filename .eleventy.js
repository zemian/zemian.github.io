module.exports = function(eleventyConfig) {

    // Copy all static files into output dir
    eleventyConfig.addPassthroughCopy("static");

    // Ignore project files
    eleventyConfig.ignores.add("readme.md");
    eleventyConfig.ignores.add("misc/");

    return {
        dir: {
            input: "src",
            output: "docs",
        },
    }
};