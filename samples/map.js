var map = require('../pattern')
  , _
  ;

map(_, [], _, function stop(cb,ac) { return cb(ac); });
map(function all(f, l, ac) {
  ac.push(f(l.shift())); // head
  map(f, l, ac); // l is now tail
});

map(function duplicate(x) { console.log(x); return x*2; }, [1,2,3], []);