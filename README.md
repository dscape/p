# pattern

`pattern` is a way to do pattern matching in javascript that helps you do asynchronous iterations. oh and fibers suck.

``` js
var insertAll = require('p');

// pretending we are doing an async call
function insertElement(data, callback) {
  var timeout = Math.ceil(Math.random() * 3000);
  setTimeout(function() { callback(null, data); }, timeout);
};

insertAll([], Function, function (cb) { cb(); });
insertAll(function (l,cb) {
  var elem = l.shift(); // head
  insertElement(elem, function(err, elem) {
    if(err) { return cb(err); }
    console.log(elem + ' inserted');
    insertAll(l, cb);
  });
}); 

insertAll([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function () { 
  console.log('done'); 
});
```

when you used to do [this].

# installation

## node.js

1. install [npm]
2. `npm install p`
3. `var p = require('p');`

## browser

1. minimize p.js
2. load it into your webpage

# roadmap

check [issues]

# contribute

everyone is welcome to contribute. patches, bug-fixes, new features

1. create an [issue][issues] so the community can comment on your idea
2. fork `pattern`
3. create a new branch `git checkout -b feature_name`
4. create tests for the changes you made
5. make sure you pass both existing and newly inserted tests
6. commit your changes
7. push to your branch `git push origin feature_name`
8. create an pull request

# meta

* code: `git clone git://github.com/dscape/p.git`
* home: <http://github.com/dscape/p>
* bugs: <http://github.com/dscape/p/issues>
* build: [![build status](https://secure.travis-ci.org/dscape/p.png)](http://travis-ci.org/dscape/pattern)

`(oO)--',-` in [caos]

[npm]: http://npmjs.org
[issues]: http://github.com/dscape/p/issues
[caos]: http://caos.di.uminho.pt/
[samples]: https://github.com/dscape/p/tree/master/samples
[this]: https://gist.github.com/00663e475092e55ac66c#file_howitis.js
