var map = require('../pattern')
  , mapa = require('../pattern')
  , zip_with = require('../pattern')
  , filtera = require('../pattern')
  , maybe = require('../pattern')
  , _, f, ac, l, l1, l2, cb, errcb
  ;

// error handling for conditional execution of functions
maybe(Error, _, errcb, cb, function (err, data, errcb, cb) { errcb(err); });
maybe(_, _, errcb, cb, function(err, data, errcb, cb) { cb(data); });

// map
map(f, [], ac, cb, 
  function map_done(f, l, ac, cb) { return cb(ac); });
map(f, l, ac, cb, 
  function map_catch_all(f, l, ac, cb) {
    ac.push(f(l.shift())); // head
    map(f, l, ac, cb); // l is now tail
  });

// map with async f, no error possible
mapa(f, [], ac, cb, 
  function map_done(f, l, ac, cb) { return cb(ac); });
mapa(f, l, ac, cb, 
  function map_catch_all(f, l, ac, cb) {
    f(l.shift(), function(x) {
      ac.push(x);
      mapa(f, l, ac, cb); // l is now tail
    });
  });

// filter with async f
filtera(f, [], ac, cb, function filter_done(f, l, ac, cb) { 
  return cb(null, ac); 
});
filtera(f, l, ac, cb, function filter_catch_all(f, l, ac, cb) {
  var head = l.shift();
  f(head, function(err, ok) {
    maybe(err, ok, cb, function (ok) {
      if (ok) ac.push(head);
      filtera(f, l, ac, cb); // l is now tail
    });
  });
});

// foldl

zip_with(f, [], l2, ac, cb, function emptyl1(f, l1, l2, ac, cb) { cb(ac); });
zip_with(f, l1, [], ac, cb, function emptyl2(f, l1, l2, ac, cb) { cb(ac); });
zip_with(f, l1, l2, ac, cb, function all(f, l1, l2, ac, cb) {
  ac.push(f(l1.shift(), l2.shift()));
  zip_with(f, l1, l2, ac, cb);
});

module.exports = 
  { map: map, map_async: mapa, zip_with: zip_with, filter_async: filtera };