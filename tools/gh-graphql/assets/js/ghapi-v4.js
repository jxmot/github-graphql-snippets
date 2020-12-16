///////////////////////////////////////////////////////////
// Sends a POST with the GraphQL formattd body and triggers
// the 'resprcvd' event when the response is received.
function gqlPost(gql, respout) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.github.com/graphql', true);

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

    xhr.onreadystatechange = function() { // Call a function when the state changes.
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

