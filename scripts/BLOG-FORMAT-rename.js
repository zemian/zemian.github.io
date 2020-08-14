const fs = require('fs');


let originPath = 'jbake/content/blog', filePaths = [], date;
(function getFiles(path) {
	let data = fs.readdirSync(path);
	for(let pathExtension of data) {
		let tempPath = path + `/${pathExtension}`;
		if(fs.lstatSync(tempPath).isDirectory()) {
			getFiles(tempPath);
		} else {
			filePaths.push(tempPath);
		}
	}	
})(originPath);

(async function main() {
	for(let path of filePaths) {
		let entry = fs.readFileSync(path, 'utf8'); 
		if(date = (/date=.+/).exec(entry)) {
			date = (date[0]).slice(5);
			let newPath = path.split('/');
			let fileName = newPath.pop();
			fs.renameSync(path, newPath.join('/') + `/${date}-${fileName}`);
		}
	}
})();