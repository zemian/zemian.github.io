// find jbake/content/blog -type f -name "*.html" |xargs node scripts/html-to-markdown.js

const fs = require("fs");
const path = require("path");
const h2m = require("h2m");

for (let file of process.argv.slice(2)) {
	const fname = path.basename(file);
	const bname = fname.split(".");
	const newFile = path.dirname(file) + "/" + bname[0] + ".md";
	console.log("Processing", fname);

	const data = fs.readFileSync(file, 'utf8');
	const cdata = h2m(data);
	fs.writeFileSync(newFile, cdata, 'utf8');
}
