var fs = require('fs')
var es6 = require('es6-transpiler');
var declassify = require('resources/declassify.js')

var source = fs.readFileSync('src/index.js', 'utf8');
var deClassedSource = declassify(source)

var transformResult = require("es6-transpiler").run({
  src: deClassedSource,
  outputFilename: 'build/index.js',
  disallowUnknownReferences: false,
  environments: ["node", "browser"],
  globals: {
    define: false,
  },
});