var p1 = require('../pattern')
  , p2 = require('../pattern')
  , _
  ;

// pretending we are doing an async call
function insert_element(data, callback) {
  setTimeout(function() { callback(null, data); }, 
    Math.ceil(Math.random() * 1000));
}

function simple_cb(cb) { cb(); }
function done() { console.log('done'); }

function any_generator (name,context) {
  return function (l,cb) {
    var elem = l.shift(); // head
    insert_element(elem, function(err, elem) {
      if(err) { return cb(err); }
      console.log(elem + ' inserted in ' + name);
      context(l, cb);
    });
  };
}

p1([], _, simple_cb);
p1(any_generator('p1', p1)); 
p2([], _, simple_cb);
p2(any_generator('p2', p2)); 

p1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], done);
p2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], done);
