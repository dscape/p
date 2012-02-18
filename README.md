<a name="pattern"/>
# pattern

`pattern` is a way to do pattern matching in javascript that helps you do asynchronous iterations

``` js
// check `samples/nodetuts.js` for working code
insert_all([], function () { console.log('done'); });
insert_all(_, function (l) {
  insert_element(l.shift(), function (elem) {
    console.log('‣ ', elem);
    insert_all(l);
  });
});

insert_all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

the first pattern in `pattern` sets the arity of the function to execute

``` js
// first call sets arity #1
// when this condition is met it logs the message done
insert_all([], function () { console.log('done'); });
```

then we normally register the iteration pattern:

``` js
// var _; was set in the top, value is undefined
insert_all(_, function (l) {
```

if you then call `insert_all` where the argument count matches arity, `pattern` knows its time to execute

``` js
// one argument, arity #1
// run forest, run
insert_all([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
```

[this] is the code you would normally write to do the same thing in javascript

<a name="installation"/>
# installation

<a name="node"/>
## node.js

1. install [npm]
2. `npm install p`
3. `var p = require('p');`

<a name="samples"/>
# samples

there are samples in the `samples` directory. check them out

<a name="disclaimer"/>
# disclaimer

if you are not familiar with `haskell` and you love your javascript object oriented code you better look away right now. this pretty much breaks everything you love and care about in javascript

`pattern` was made so i could learn some more javascript. it's slow, and certainly not web scale

this software does not obey laws, common best practices, or even common sense

it does everything that is wrong in javascript; or at least attempts to (suggestions are welcome)

i'll probably still use it anyway

<a name="roadmap"/>
# roadmap

[pointfree] style (**note** i'm just kidding)

<a name="contribute"/>
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

<a name="meta"/>
# meta

* code: `git clone git://github.com/dscape/p.git`
* home: <http://github.com/dscape/p>
* bugs: <http://github.com/dscape/p/issues>
* build: [![build status](https://secure.travis-ci.org/dscape/p.png)](http://travis-ci.org/dscape/pattern)

`(oO)--',-` in [caos]

<a name="license"/>
# license

copyright 2012 nuno job <nunojob.com> `(oO)--',--`

licensed under the apache license, version 2.0 (the "license");
you may not use this file except in compliance with the license.
you may obtain a copy of the license at

    http://www.apache.org/licenses/LICENSE-2.0

unless required by applicable law or agreed to in writing, software
distributed under the license is distributed on an "as is" basis,
without warranties or conditions of any kind, either express or implied.
see the license for the specific language governing permissions and
limitations under the license

[npm]: http://npmjs.org
[issues]: http://github.com/dscape/p/issues
[caos]: http://caos.di.uminho.pt/
[samples]: https://github.com/dscape/p/tree/master/samples
[this]: https://gist.github.com/00663e475092e55ac66c#file_howitis.js
[pointfree]: http://www.haskell.org/haskellwiki/Pointfree
