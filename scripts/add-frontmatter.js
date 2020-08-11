// find jbake/content/blog -type f -name "*.adoc.bak" |xargs node scripts/add-frontmatter.js
const fs = require("fs");
const path = require("path");

for (let file of process.argv.slice(2)) {
	const fname = path.basename(file);
	const bname = fname.split(".");
	const mdFile = path.dirname(file) + "/" + bname[0] + ".md";

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
		// const map = {};
		// for (let line of lines.slice(0, sepIndex)) {
		// 	let words = line.split("=");
		// 	if (words[0] === "tags")
		// 		map[words[0]] = words[1].split(/,\s*/);
		// 	else
		// 		map[words[0]] = words[1];
		// }
		let front = lines.slice(0, sepIndex).join("\n") + "\n~~~~~~\n\n";
		const mdText = fs.readFileSync(mdFile, "utf8");

		//console.log(front + mdText);
		fs.writeFileSync(mdFile, front + mdText, "utf8");
	}
}
