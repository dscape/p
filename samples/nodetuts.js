var insert_all = require('../pattern')
  , _
  ;

// pretending we are doing an async call
function insert_element(data, callback) {
  setTimeout(function() { callback(null, data); }, 
    Math.ceil(Math.random() * 1000));
}

insert_all([], _, function (cb) { cb(); });
insert_all(function (l,cb) {
  var elem = l.shift(); // head
  insert_element(elem, function(err, elem) {
    if(err) { return cb(err); }
    console.log(elem + ' inserted');
    insert_all(l, cb);
  });
}); 

insert_all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function () { 
  console.log('done'); 
});