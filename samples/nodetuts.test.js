/* done */
var insert_all = require('../pattern')(), _;

// pretending we are doing an async call
function insert_element(data, callback) {
  setTimeout(function() { callback(data); }, 
    Math.ceil(Math.random() * 100));
}

insert_all([], _, function stop(l,cb) { cb(); });
insert_all(_, _, function catchall(l, cb) {
  insert_element(l.shift(), function elem_cb(elem) {
    console.log(elem + ' inserted');
    insert_all(l, cb);
  });
});

insert_all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
  function done() { console.error('done'); });