///////////////////////////////////////////////////////////
// Sends a POST with the GraphQL formatted body and triggers
// the 'resprcvd' event when the response is received.
function gqlPost(gql, respout) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.github.com/graphql', true);

    // test ghauth and see if it's been set correctly, if 
    // not then display an error message at the top of the page
    if(checkGQLAuth() === false) {
        var err = document.getElementById('autherror');
        err.innerHTML = '<h1 style="color:red;text-align:center;">Invalid Personal Access Token!</h1>' +
                        '<p style="text-align:center;">Open and Edit the <strong>ghauth.js</strong> file</p>';
    } else {
        // Edit the file named ghauth.js and enter your GitHub
        // Personal Access Token.
        xhr.setRequestHeader('Authorization', ghauth);

        // The 'Accept' key is necessary for certain GitHub V4
        // API endpoints. 
        //
        // application/vnd.github.bane-preview+json - used for label create, update, delete
        // 
        xhr.setRequestHeader('Accept', 'application/vnd.github.bane-preview+json');
        xhr.setRequestHeader('Content-Type', 'application/graphql');

        xhr.onreadystatechange = function() { 
            if (this.readyState === XMLHttpRequest.DONE) {
                if(this.status === 200) {
                    $(document).trigger('resprcvd', JSON.stringify(JSON.parse(this.response), null, 2));
                } else {
                    $(document).trigger('resprcvd', 'There was an error, status = '+this.status);
                }
            }
        }
        xhr.send(gql);
    }
}

