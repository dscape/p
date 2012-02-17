;(function (pattern) {
  pattern = function pattern() {
    console.log('a');
  };
})(typeof exports === "undefined" ? pattern = {} : exports);