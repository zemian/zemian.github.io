// find jbake/content/blog -type f|xargs node scripts/check-posts.js

const fs = require("fs");
const path = require("path");

const chars = "abcdefghijklmnopqrstuvwxyz0123456789-".split("");
const fileCount = {};
for (let file of process.argv.slice(2)) {
	const fname = path.basename(file);
	const bname = fname.split(".");
	if (bname.length > 2) {
		console.log("BAD (multiple dots): ", file);
		continue;
	}

	if (bname[1] == undefined || bname[1] === "") {
		console.log("BAD (no ext)", file);
		continue;
	}

	if (bname[0].includes("--")) {
		console.log("BAD (has --)", file);
		continue;
	}

	if (!fileCount[bname[1]])
		fileCount[bname[1]] = 0
	fileCount[bname[1]] ++;

	const ary = bname[0].split("");
	const badChars = ary.filter(c => !chars.includes(c));
	if (badChars.length > 0) {
		console.log("BAD (chars" + badChars.join(",") + ")", "'" + file + "'");
	}
}

console.log("File type counts:");
let total = 0;
for (const t in fileCount) {
	console.log(t, ":", fileCount[t]);
	total += fileCount[t];
}

console.log("Total posts: ", total);