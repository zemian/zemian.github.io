module.exports = function(eleventyConfig) {

    // Copy all static files into output dir
    eleventyConfig.addPassthroughCopy({"static/": "./"});
    eleventyConfig.addPassthroughCopy({"node_modules/bulma/css/bulma.*": "./css"});

    // Ignore project files
    eleventyConfig.ignores.add("readme.md");
    eleventyConfig.ignores.add("misc/");

    return {
        dir: {
            input: "src",
            output: "docs",
        },
        templateFormats: ["html", "md", "njk", "11ty.js"],
        dataTemplateEngine: false,
        markdownTemplateEngine: "liquid",
        htmlTemplateEngine: "njk",
    }
};