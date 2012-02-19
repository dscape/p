/* [ 1, 2, 3, 4, 5 ] */
var reduce = require('./hof').foldl;

function id(z, x, cb) {
  setTimeout(
    function() {z.unshift(x); cb(z);}, Math.ceil(Math.random() * 100)); }

function reserve (list, cb) { reduce(id, [], list, function(z){ cb(z); }); }

reserve([5,4,3,2,1], function (list) { console.error(list); });