//Gets rid off @UIApplicationMain @NSApplicationMain
function filterSwiftFile(file) {
	var filteredString;
	filteredString = file.replace("@UIApplicationMain", "//@UIApplicationMain").replace("@NSApplicationMain", "//@NSApplicationMain");
	return filteredString;
}

module.exports = {
	filterSwiftFile
}