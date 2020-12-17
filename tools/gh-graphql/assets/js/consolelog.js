// A console.log() replacement, a boolean variable
// is used for enabling or disabling its output.
const _debug = true;

function consolelog(msg) {
    if (_debug === true) {
        console.log(msg);
    }
}
