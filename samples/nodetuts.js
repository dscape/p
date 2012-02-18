var insert_all = require('../pattern'), _;

// pretending we are doing an async call
function insert_element(data, callback) {
  setTimeout(function() { callback(data); }, 
    Math.ceil(Math.random() * 1000));
}

insert_all([], function done() { console.log('done'); });
insert_all(_, function catchall(l) {
  insert_element(l.shift(), function elem_cb(elem) {
    console.log(elem + ' inserted');
    insert_all(l);
  });
});

insert_all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);