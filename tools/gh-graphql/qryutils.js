///////////////////////////////////////////////////////////
// qryutils.js: GraphQL Query/Mutation & Variables 
//              Utility Functions
//
// This file contains:
//
//      rmvComments()       : Strips out comments
//      splitQueryVars()    : Separates the Query/Mutation
//                            and Variables (if present)
//      gqlToPOST()         : Converts GraphQL to POST format
//
///////////////////////////////////////////////////////////
// Remove any line that has a comment which
// will contain a "#". The entire line is
// removed so lines with code and comments
// will be removed.
function rmvComments(content) {
var out = [];

    // first split into an array at newline
    var qry = content.split(/\r?\n/);
    // interate through the array and...
    for(ix = 0, io = 0; ix < qry.length; ix++) {
        // if there is NO comment...
        if(!qry[ix].includes('#')) {
            // if it is long enough...
            if(qry[ix].length > 0) {
                // copy it to the output
                out[io] = qry[ix];
                io++;
            }
        }
    }
    // convert the array into a string and
    // terminate it with a newline
    return (out.join('\n') + '\n');
}

// Extract the variables section from the 
// file. The input cannot contain any comments.
// Call rmvComments() first and pass its 
// return to this function.
//
// Returns an array of 2 strings:
//  [0] = query or mutation
//  [1] = variables
function splitQueryVars(content) {
var qout = [];
var vout = [];
var obrace = 0;
var cbrace = 0;
var inquery = true;

    // first split into an array at newline
    var qry = content.split(/\r?\n/);
    // interate through the array and...
    for(ix = 0, qio = 0, vio = 0; ix < qry.length; ix++) {
        // Copy the query portion and also count
        // the braces. When the number of closing
        // matches open then the entire query portion
        // has been found. Stop looking for braces
        // and copy everything remaining to variables.
        if(inquery === true) {
            // copy the query
            qout[qio] = qry[ix];
            qio++;
            // check for braces...
            if(qry[ix].includes('{')) {
                obrace += 1;
            } // NO else, a line might contain both braces
            if(qry[ix].includes('}')) {
                cbrace += 1;
            }
            if(obrace === cbrace) {
                inquery = false;
                continue;
            }
        } else {
            // copy the rest
            vout[vio] = qry[ix];
            vio++;
        }
    }
    var ret = [
        (qout.join('\n') + '\n'),
        (vio >= 3 ? (vout.join('\n') + '\n') : null)
    ];
    return ret;
}

// Export human-readable queries (and data) to 
// GraphQL POST-ing format.
function gqlToPOST(qtext, vtext) {
    const variables = vtext ? JSON.parse(vtext) : undefined;
    const queryObj = {
      query: qtext,
      variables
    };
    return(JSON.stringify(queryObj, null, 2));
}

