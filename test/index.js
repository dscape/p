var fs    = require('fs')
  , assert = require('assert')
  , path = __dirname + '/../samples/'
  , files = fs.readdirSync(path)
  , spawn = require('child_process').spawn
  , colors
  , return_code = 0
  , i = 0
  ;

try { colors = require('colors'); } catch (e) {}
function c(msg,color) { return colors ? msg[color] : msg; }

var tests = files.filter(function (f) { return f.indexOf('.test.') !== -1; });
var expected = tests.length;

tests.forEach(
  function (f) {
    var contents = fs.readFileSync(path + f, 'utf-8')
      , output = /\/\*\s*(.*?)\s*\*\//.exec(contents)[1]
      , node = spawn('node', [path + f])
      , buffer = ''
      ; 
    node.stderr.on('data', function(data) { buffer += data; });
    node.on('exit', function() {
      i++;
      buffer = buffer.replace(/^\s+|\s+$/g,"");
      var ok = buffer === output;
      console.log(c(ok ? '✔' : '✗', ok ? 'green' : 'red'), 'samples/'+f);
      if(!ok) {
        return_code=1;
        console.log(c('  ♯', 'cyan'), buffer);
        console.log(c('  δ', 'magenta'), output);
      }
      if(i===expected) {
        process.exit(return_code);
      }
    });
  }
);