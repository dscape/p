var map = require('../pattern')
  , _, f, ac
  ;

map(f, [], ac, function done(_, _, ac) { return console.log(ac); });
map(f, _, ac, function all(f, l, ac) {
  ac.push(f(l.shift())); // head
  map(f, l, ac); // l is now tail
});

map(function duplicate(x) { console.log(x*2); return x*2; }, [1,2,3], []);
map(function plusone(x) { return x+1; }, [1,2,3], []);