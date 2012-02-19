/* yeah! */
var filter = require('./hof').filter_async;

// simulating an async function that could throw
function gotBang(x, cb) {
  setTimeout(function() {
    try {
      if (x.msg.indexOf('!') !== 1) {
        process.stderr.write(x.msg);
        cb(null, x); }
    } catch (e) { cb(e); }
  }, Math.ceil(Math.random() * 300));
}

filter(gotBang, 
  [ {msg: "y"}
  , {msg: "e"}
  , {msg: "a"}
  , {msg: "h"}
  , {msg: "!"}
  , null
  , {msg: "?"}
  ], [], function(err,data) { 
    if(!err) { console.error('I will never get executed!'); } });
