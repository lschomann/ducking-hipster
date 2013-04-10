

// enable routes defined in different files as mentioned in:
// http://stackoverflow.com/questions/6059246/how-to-include-route-handlers-in-multiple-files-in-express
var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
};
