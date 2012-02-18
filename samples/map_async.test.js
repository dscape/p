/* [ 2, 4, 6 ] */
var map_async = require('./hof').map_async;

function duplicate(x, cb) {
  setTimeout(function() { cb(x*2); }, Math.ceil(Math.random() * 100));
}

map_async(duplicate, [1,2,3], [], function(ac) { console.error(ac); });