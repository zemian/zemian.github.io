const fs = require('fs');

let originPath = 'jbake/content/blog';
function rewriteHeader(path) {
	let file = fs.readFileSync(path, {encoding: 'utf8'});
	let header = file.split('\n').slice(0, 4);
	header.unshift('---');
	header.splice(3, 1);
	let tags = header[3].slice(5).split(', ');
	for(let tag of tags) {
		header.push(`  - ${tag}`)
	}
	header[3] = 'tags:'
	header.push('---');
	header = header.join('\n');
	header = header.replace(/=/g, ': ', 'g');
	file = file.split('~~~~~~');
	file.shift();
	file.unshift(header);
	file = file.join('');
	fs.writeFileSync(path, file);
}

(function getFiles(path) {
	let data = fs.readdirSync(path);
	for(let pathExtension of data) {
		let tempPath = path + `/${pathExtension}`;
		if(fs.lstatSync(tempPath).isDirectory()) {
			getFiles(tempPath);
		} else {
			rewriteHeader(tempPath);
		}
	}	
})(originPath);