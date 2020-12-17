// A console.log() replacement, a boolean variable
// is used for enabling or disabling its output.

// this variable name uses the underscore in its 
// name to avoid potential conflicts with other
// code that might use 'debug' for its own purposes.
const _debug = false;

// nothing fancy, just the basics...
function consolelog(msg) {
    if (_debug === true) {
        console.log(msg);
    }
}
