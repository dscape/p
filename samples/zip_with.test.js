/* [ '1:2', '3:4', '5:6' ] */
var zip = require('./hof').zip_with;

zip(function concat(a,b) { return a + ':' + b; },
  [1,3,5], [2,4,6,8], [], function (ac) {
    console.error(ac);
  });