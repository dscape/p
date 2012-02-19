var p = require('../pattern')
  , map = p()
  , mapa = p()
  , zip_with = p()
  , filtera = p()
  , maybe = p()
  , foldl = p()
  , _, f, ac, l, l1, l2, cb, errcb, z
  ;

// error handling for conditional execution of functions
maybe(Error, _, errcb, cb, function (err, data, errcb, cb) { errcb(err); });
maybe(_, _, errcb, cb, function(err, data, errcb, cb) { cb(data); });

// map
// map _ []     = []
// map f (x:xs) = f x : map f xs
map(_, [], ac, cb, 
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
// filter _ [] = []  
// filter p (x:xs)   
//     | p x       = x : filter p xs  
//     | otherwise = filter p xs
filtera(_, [], ac, cb, function filter_done(f, l, ac, cb) { 
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

// foldl with async f, no errors possible
// foldl f z []     = z                  
// foldl f z (x:xs) = foldl f (f z x) xs
foldl(f, z, [], cb, function foldl_done(f, z, l, cb) { cb(z); });
foldl(f, z, l, cb, function foldl_all(f, z, l, cb) {
  f(z, l.shift(), function foldl_f_async(new_z) {
    foldl(f, new_z, l, cb);
  });
});

// zipWith _ [] _ = []  
// zipWith _ _ [] = []  
// zipWith f (x:xs) (y:ys) = f x y : zipWith' f xs ys
zip_with(_, [], _, ac, cb, function emptyl1(f, l1, l2, ac, cb) { cb(ac); });
zip_with(_, _, [], ac, cb, function emptyl2(f, l1, l2, ac, cb) { cb(ac); });
zip_with(f, l1, l2, ac, cb, function all(f, l1, l2, ac, cb) {
  ac.push(f(l1.shift(), l2.shift()));
  zip_with(f, l1, l2, ac, cb);
});

module.exports = 
  { map: map, map_async: mapa, zip_with: zip_with, filter_async: filtera
  , foldl: foldl };