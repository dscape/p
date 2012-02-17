var insertAll = require('./pattern'), _;

// pretending we are doing an async call
function insertElement(data, callback) {
  var timeout = Math.ceil(Math.random() * 3000);
  setTimeout(function() { callback(null, data); }, timeout);
}

insertAll([], _, function (cb) { cb(); });
insertAll(function (l,cb) {
  var elem = l.shift(); // head
  insertElement(elem, function(err, elem) {
    if(err) { return cb(err); }
    console.log(elem + ' inserted');
    insertAll(l, cb);
  });
}); 

insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function() { 
  console.log('done'); 
});