///////////////////////////////////////////////////////////
// qryout.js: The 'postready' event handler and associated
// code that displays the POST-ready query and enables 
// the ability send the query to GitHub and display the
// results.

// Wait until the dropped file has been processed for use
$(document).on('postready', function(ev, gqlquery) {
    // show it to the user...
    showQuery(gqlquery);
    // show/enable the button to send the query to GitHub
    enablePosting();
});

// Wait for the event that tells us we've got a reply
// to the query/mutation that we sent.
//
// NOTE: Error detection and notification will be here.
$(document).on('resprcvd', function(ev, gqlresp) {
    // POST reply (move to reply event handler)
    var pr = document.getElementById('post_reply');
    pr.innerHTML = '<p><strong>Response from GitHub :</strong></p>' +
                   '<pre id="postreply">'+gqlresp+'</pre>';
});

// Show the POST-ready query to the user
function showQuery(qry) {
    var qf = document.getElementById('post_file');
    qf.innerHTML = '<p><strong>Ready for POST-ing :</strong></p>' +
                   '<pre id="postout">' +
		           qry.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
		           '</pre>';
}

// Enable(show) the POST button and wait 
// for it to be clicked
function enablePosting() {
    // button
    var ps = document.getElementById('post_send');
    ps.innerHTML = '<button id="runbtn" type="button">POST GraphQL</button>';

    $('#runbtn').on('click', function() {
        var po = document.getElementById('postout');
        consolelog(po.innerHTML);
        gqlPost(po.innerHTML, document.getElementById('post_reply'));
    });
}


