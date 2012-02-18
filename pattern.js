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
      var ok = false;
      ol: for(var i=0; i<arguments.length; i++) { // for each argument
        il: for(var j=0; j<stack.length; j++) { // for pattern in the stack
          var s = stack[j]; // get the current pattern
          log('α ', i, j);
          log('  ░ ', s, s[i]);
          log('  σ ', s.length);
          log('  • ', [].slice.call(arguments,0));
          if(s.length > i) { // if there's something in this pos for pattern
            if(match(s[i], arguments[i])) { // if we have a match
              ok = true; // set our flag to matching
              log('  ✔ ', s[i], '===', arguments[i]);
              j=0;
              if(arguments.length !== i+1) { log('  ⥁'); continue ol; } }
            else {  // if it doesnt match try next pattern in stack
              log('  ✗ ', s[i], '===', arguments[i]);
              // dont break and set ok to false if this is the last element
              if(stack.length!==j+1) { log('  ⥁'); ok = false; continue; } } }
          //if(stack.length === j+1) {
            // decide on the function base ok if its a match or not
            var f = ok ? arguments[arguments.length-1] : s[s.length-1];
            log('  ' + (ok ? 'λ' : 'ƒ'), f.name || f);
            // execute whatever is the last argument on last pattern of stack
            return f.apply(this, [].slice.call(arguments,0)); } } //}
    } else {
      stack.push([].slice.call(arguments,0)); // initializing add pattern
      log('‣ ', [].slice.call(arguments,0));
    }
  } // dont cache, each require is a new inst.
  if(require.cache[module.id]) // make isaac nervous
    delete require.cache[module.id]; // make everyone hate me
  module.exports = exports = p; // export our ""constructor""
})();