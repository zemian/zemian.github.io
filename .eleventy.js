let dateFilter = require('nunjucks-date-filter');

module.exports = function(eleventyConfig) {

    // Copy all static files into output dir
    eleventyConfig.addPassthroughCopy({"static/": "./"});
    eleventyConfig.addPassthroughCopy({"node_modules/bulma/css/bulma.*": "./css"});

    // Ignore project files
    eleventyConfig.ignores.add("readme.md");
    eleventyConfig.ignores.add("misc/");

    // The Nunjucks does not have "date" filter!
    eleventyConfig.addNunjucksFilter("date", dateFilter);
    eleventyConfig.addNunjucksFilter("keys", obj => Object.keys(obj));

    // Add "link_to" function to template
    eleventyConfig.addPlugin(require('eleventy-plugin-link_to'));

    return {
        dir: {
            input: "src",
            output: "_site",
        },
        templateFormats: ["html", "md", "njk", "11ty.js"],
        dataTemplateEngine: false,
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
    }
};