var p1 = require('../pattern')()
  , p2 = require('../pattern')()
  , _
  ;

// pretending we are doing an async call
function insert_element(data, callback) {
  setTimeout(function() { callback(data); }, 
    Math.ceil(Math.random() * 1000));
}

function done(l) { console.log('done'); }

function any_generator (name,context) {
  return function (l) {
    insert_element(l.shift(), function(elem) {
      console.log(elem + ' inserted in ' + name);
      context(l);
    });
  };
}

p1([], done);
p1(_, any_generator('p1', p1)); 
p2([], done);
p2(_, any_generator('p2', p2)); 

p1([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
p2([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);