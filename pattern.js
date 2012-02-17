(function () {
  var stack = [];

  function p(a) {
    stack.push(a);
    console.log(stack);
  };

  if(typeof exports !== 'undefined') { // node
    // dont cache, each require is a new inst.
    if(require.cache[module.id])
      delete require.cache[module.id];
    // export
    module.exports = exports = p;
  } else window.pattern = p;
})();