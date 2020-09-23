// find jbake/content/blog -type f -name "*.adoc" |xargs node scripts/remove-frontmatter.js
// find jbake/content/blog -type f -name "*.adoc.bak" |xargs node scripts/remove-frontmatter.js
const fs = require("fs");
const path = require("path");

for (let file of process.argv.slice(2)) {
	const fname = path.basename(file);
	const bname = fname.split(".");
	const bakFile = file + ".bak";

	// // Rename file as .bak
	// console.log(`mv ${file} ${bakFile}`);
	// fs.renameSync(file, bakFile);

	// Need to strip frontmatter and rewrite new .adoc file
	const lines = fs.readFileSync(file, "utf8").split("\n");

	let sepIndex = -1;
	for (let line of lines) {
		sepIndex ++;
		if (line === "~~~~~~") {
			break;
		} 
	}

	if (sepIndex == lines.length - 1) {
		console.log("ERROR: front matter not found!");
	} else {
		const adocFile = path.dirname(file) + "/" + bname[0] + ".adoc";
		console.log(`Creating ${adocFile}`);
		const text = lines.slice(sepIndex + 1).join("\n");
		// console.log(text);
		fs.writeFileSync(adocFile, text, "utf8");
	}
}
