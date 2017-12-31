var fs = require('fs')
var es6 = require('es6-transpiler');
var declassify = require('./resources/declassify')
var rollup = require('rollup')

// var source = fs.readFileSync('src/index.js', 'utf8');
// var deClassedSource = declassify(source)

// var transformResult = require("es6-transpiler").run({
//   src: deClassedSource,
//   outputFilename: 'build/index.js',
//   disallowUnknownReferences: false,
//   environments: ["node", "browser"],
//   globals: {
//     define: false,
//   },
// });

var fileName = './src/index.js'
rollup.rollup({
  entry: fileName,
  plugins: [
      {
        transform: function(source) {
          return declassify(source);
        }
      }
    ]
  })
  .catch(function(e) {console.log(e)})
  .then(function (bundle) {
    var copyright = fs.readFileSync('./resources/COPYRIGHT');

    var bundled = bundle.generate({
      format: 'umd',
      banner: copyright,
      moduleName: 'IndexedDoublyLinkedList'
    }).code;

    var es6 = require('es6-transpiler');

    var transformResult = require("es6-transpiler").run({
      src: bundled,
      disallowUnknownReferences: false,
      environments: ["node", "browser"],
      globals: {
        define: false,
      },
    });

    if (transformResult.errors && transformResult.errors.length > 0) {
      throw new Error(transformResult.errors[0]);
    }

    var transformed = transformResult.src;
    fs.writeFileSync('./build/index.js', transformed);

  //   var minifyResult = uglify.minify(transformed, {
  //     fromString: true,
  //     mangle: {
  //       toplevel: true
  //     },
  //     compress: {
  //       comparisons: true,
  //       pure_getters: true,
  //       unsafe: true
  //     },
  //     output: {
  //       max_line_len: 2048,
  //     },
  //     reserved: ['module', 'define', 'Immutable']
  //   });

  //   var minified = minifyResult.code;

  //   fs.writeFileSync(file.dest + '.min.js', copyright + minified);
  // }).then(function(){ done(); }, function(error) {
  //   grunt.log.error(error.stack);
  //   done(false);
  // });
}).catch(function(e) {console.log(e)});