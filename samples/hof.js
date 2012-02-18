var map = require('../pattern')
  , mapa = require('../pattern')
  , _, f, ac
  ;

// high order functions
map(f, [], ac, _, 
  function map_done(f, l, ac, cb) { return cb(ac); });
map(f, _, ac, _, 
  function map_catch_all(f, l, ac, cb) {
    ac.push(f(l.shift())); // head
    map(f, l, ac, cb); // l is now tail
  });

mapa(f, [], ac, _, 
  function map_done(f, l, ac, cb) { return cb(ac); });
mapa(f, _, ac, _, 
  function map_catch_all(f, l, ac, cb) {
    f(l.shift(), function(x) {
      ac.push(x);
      mapa(f, l, ac, cb); // l is now tail
    });
  });

module.exports = { map: map, map_async: mapa };