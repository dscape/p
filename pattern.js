(function () {
  var stack = [], arity, DEBUG = process.env.DEBUG;
  function log() { if(DEBUG) console.log.apply(this,arguments); }
  function match(pattern, value) {
    if(pattern === undefined)
      return true;
    if(typeof pattern === 'object')
      return JSON.stringify(pattern) === JSON.stringify(value);
    return pattern.toString() === value.toString();
  }
  function p() {
    if(!arity) { arity = arguments.length-1; } // set arity in first invok.
    if(arity===arguments.length) { // # arguments match arity, execute
      var ok = false, j = 0;
      for(var i in arguments) { // for each argument
        while(j<stack.length) { // for each pattern in the stack
          var s = stack[j]; // get the current pattern
          log('α ', j);
          log('  ░ ', s);
          log('  •', [].slice.call(arguments,0));
          j++;
          if(s[i]) { // if there's is something in this position for pattern
            if(match(s[i], arguments[i])) { // if we have a match
              ok = true; // set our flag to matching
              log('  ✔ ', s[i], '===', arguments[i]);
              continue; } // continue iterating stack
            else {  // if it doesnt match try next pattern in stack
              log('  ✗ ', s[i], '===', arguments[i]);
              // dont break and set ok to false if this is the last element
              if(stack.length !== j) { ok = false; break; } } }
          if(stack.length === j) { // if we are out of stack
            // decide on the function base ok if its a match or not
            var f = ok ? arguments[arguments.length-1] : s[s.length-1];
            log('  λ', f);
            // execute whatever is the last argument on last pattern of stack
            return f.apply(this, [].slice.call(arguments,0)); } } }
    } else {
      stack.push([].slice.call(arguments,0)); // initializing add pattern
      log('‣ ', [].slice.call(arguments,0));
    }
  } // dont cache, each require is a new inst.
  if(require.cache[module.id]) // make isaac nervous
    delete require.cache[module.id]; // make everyone hate me
  module.exports = exports = p; // export our ""constructor""
})();