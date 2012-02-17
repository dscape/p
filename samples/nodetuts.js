var insertAll = require('../pattern');

insertAll([], cb, cb);
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