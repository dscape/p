var map = require('../pattern')
  , mapa = require('../pattern')
  , zip_with = require('../pattern')
  , _, f, ac, l, l1, l2, cb
  ;

// high order functions
map(f, [], ac, cb, 
  function map_done(f, l, ac, cb) { return cb(ac); });
map(f, l, ac, cb, 
  function map_catch_all(f, l, ac, cb) {
    ac.push(f(l.shift())); // head
    map(f, l, ac, cb); // l is now tail
  });

mapa(f, [], ac, cb, 
  function map_done(f, l, ac, cb) { return cb(ac); });
mapa(f, l, ac, cb, 
  function map_catch_all(f, l, ac, cb) {
    f(l.shift(), function(x) {
      ac.push(x);
      mapa(f, l, ac, cb); // l is now tail
    });
  });

// filter
// foldl

zip_with(f, [], l2, ac, cb, function emptyl1(f, l1, l2, ac, cb) { cb(ac); });
zip_with(f, l1, [], ac, cb, function emptyl2(f, l1, l2, ac, cb) { cb(ac); });
zip_with(f, l1, l2, ac, cb, function all(f, l1, l2, ac, cb) {
  ac.push(f(l1.shift(), l2.shift()));
  zip_with(f, l1, l2, ac, cb);
});

module.exports = { map: map, map_async: mapa, zip_with: zip_with };