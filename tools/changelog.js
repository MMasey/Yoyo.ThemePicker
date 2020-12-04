const Changelog = require('generate-changelog');
const Fs = require('fs');
const packageJSON = require('../package.json');

return Changelog.generate({
	patch: false,
	repoUrl: packageJSON.repository.url
})
.then((changelog) => {
	// TODO: Check for existance of the file before trying to access it.
	// Get existing contents
	Fs.readFile('./CHANGELOG.md', 'utf8', (err, contents) => {
			//console.log(contents);
			// write new entries to the change log
			Fs.writeFileSync('./CHANGELOG.md', changelog, function(err, result) {
				if (err) console.log('error', err);
			});
			// Append the existing contents
			Fs.appendFile('./CHANGELOG.md', contents, function(err, result) {
				if (err) console.log('error', err);
			});
		});
});
