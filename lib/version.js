var JTABLE = (JTABLE || {})

JTABLE.version = {
  major: 0,
  minor: 0,
  patch: "development"
}

JTABLE.version.toString = function() {
  return [JTABLE.version.major, JTABLE.version.minor, JTABLE.version.patch].join('.')
};