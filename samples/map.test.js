/* [ 2, 3, 4 ] */
var map = require('../pattern')()
  , _, f, ac
  ;

map(f, [], ac, function done(_, _, ac) { return console.error(ac); });
map(f, _, ac, function all(f, l, ac) {
  ac.push(f(l.shift())); // head
  map(f, l, ac); // l is now tail
});

map(function plusone(x) { return x+1; }, [1,2,3], []);