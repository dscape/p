var map = require('../pattern')
  , _
  ;

map(_, [], _, function(cb,ac) { return cb(ac); });
map(function(f, l, ac) {
  ac.push(f(l.shift())); // head
  map(f, l, ac); // l is now tail
});

map(function(x) { return x*2; }, [1,2,3], []);