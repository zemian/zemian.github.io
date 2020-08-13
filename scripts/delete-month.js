const fs = require('fs');

let originPath = 'jbake/content/blog', directories = [];
(function moveFiles(path) {
	let data = fs.readdirSync(path);
	for(let pathExtension of data) {
		let tempPath = path + `/${pathExtension}`;
		if(fs.lstatSync(tempPath).isDirectory()) {
			directories.push(tempPath);
			moveFiles(tempPath);
		} else {
			// let newPath = tempPath.split('/');
			// newPath.splice(newPath.length - 2, 1);
			// newPath = newPath.join('/');
			// fs.renameSync(tempPath, newPath);
		}
	}
})(originPath);
for(let directory of directories) {
	directory = directory.split('/');
	if(directory[directory.length - 1].length === 2) {
		fs.rmdirSync(directory.join('/'));
	}
}