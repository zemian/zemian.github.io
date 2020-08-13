const fs = require('fs');


let originPath = 'jbake/content/blog', filePaths = [];
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
	for(let entry of filePaths)
})();