const fs = require('fs');

let originPath = 'jbake/content/blog';
(function moveFiles(path) {
	let data = fs.readdirSync(path);
	for(let pathExtension of data) {
		let tempPath = path + `/${pathExtension}`;
		if(fs.lstatSync(tempPath).isDirectory()) {
			moveFiles(tempPath);
		} else {
			let newPath = tempPath.split('/');
			newPath.splice(newPath.length - 2, 1);
			newPath = newPath.join('/');
			fs.renameSync(tempPath, newPath);
		}
	}
})(originPath);