var map = require('./hof').map;

map(function duplicate(x) { return x*2; }, [1,2,3], [],
  function (x) { console.log(x); });