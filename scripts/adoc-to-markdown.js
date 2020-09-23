// find jbake/content/blog -type f -name "*.adoc" |xargs node scripts/adoc-to-markdown.js

const fs = require("fs");
const path = require("path");

for (let file of process.argv.slice(2)) {
	const fname = path.basename(file);
	const bname = fname.split(".");
	const bakFile = file + ".bak";
	const xmlFile = path.dirname(file) + "/" + bname[0] + ".xml";
	const mdFile = path.dirname(file) + "/" + bname[0] + ".md";
	//console.log("Processing", fname);

	// Need to strip frontmatter and rewrite new .adoc file

	console.log(`asciidoc -b docbook ${file}`);
	console.log(`pandoc -f docbook -t markdown_strict ${xmlFile} -o ${mdFile}`);
}
