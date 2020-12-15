
$(document).on('postready', function(ev, gqlquery) {
    showQuery(gqlquery);
    // show/enable the button to send the query to GitHub
});

function showQuery(qry) {
    var qf = document.getElementById('post_file');
    qf.innerHTML = '<p><strong>Ready for POST-ing :</strong></p>' +
                   '<pre id="postout">' +
		           qry.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
		           '</pre>';
}
