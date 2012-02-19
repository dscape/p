/* CAT */
var insert_all = require('../pattern')(), _;

function insert_element(data, callback) {
  setTimeout(function() { callback(data); }, Math.ceil(Math.random() * 10));
}

insert_all([], function () { console.error('CAT'); });
insert_all(_, function (l) {
  insert_element(l.shift(), function (elem) {
    console.log('‣ ', elem);
    insert_all(l);
  });
});

insert_all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);