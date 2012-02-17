(function () {
  var stack = []
    , arity
    ;

  function p() {
    if(!arity) { arity = arguments.length-1; }
    if(arity===arguments.length) {
      console.log('executing')
    } else {
      stack.push(arguments);
      console.log(stack);
    }
  }

  if(typeof exports !== 'undefined') { // node
    // dont cache, each require is a new inst.
    if(require.cache[module.id])
      delete require.cache[module.id];
    // export
    module.exports = exports = p;
  } else {
    window.pattern = p;
  }

})();