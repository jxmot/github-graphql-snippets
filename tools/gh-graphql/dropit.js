///////////////////////////////////////
// dropit.js - The required code to 
// enable the drag and drop of a file.
//
// This code was created by researching
// drag-n-drop JavaScript implementations.
//
// It is the minimum requried for just
// the basics of drag-n-drop. 
//

// Handler for when a file is dropped into
// the target area.
function dropHandler(ev) {
    console.log('File(s) dropped');

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        if (ev.dataTransfer.items.length > 1) {
            alert("Please drop only 1 file at a time.");
        } else {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[0].kind === 'file') {
                var file = ev.dataTransfer.items[0].getAsFile();
                console.log('dropped file name = ' + file.name);
                fileContents(file);
            }
        }
    }
}

// Drag over handler
function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    ev.dataTransfer.dropEffect = 'move';
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

// After the file is dropped this function is
// called to open the file and place it's 
// contents in the HTML file.
function fileContents(file) {
	var reader = new FileReader();
	reader.onload = function(e) {
        var df = document.getElementById('drop_file');
        df.innerHTML = "<p><strong>" + file.name + ":</strong></p><pre>" +
			           e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
			           "</pre>";

        var clean = rmvComments(e.target.result);
	}
	reader.readAsText(file);
}

// Remove any line that has a comment which
// will contain a "#". The entire line is
// removed so lines with code and comments
// will be removed.
function rmvComments(content) {
var out = [];

    // first split into an array at newline
    var res = content.split(/\r?\n/);
    // interate through the array and...
    for(ix = 0, io = 0; ix < res.length; ix++) {
        // if there is NO comment...
        if(!res[ix].includes('#')) {
            // if it is long enough...
            if(res[ix].length > 0) {
                // copy it to the output
                out[io] = res[ix];
                io++;
            }
        }
    }
    // convert the array into a string and
    // terminate it with a newline
    return (out.join('\n') + '\n');
}


// Set up the minium of handlers for drag-n-drop
var dz = document.getElementById('drop_zone');
dz.addEventListener('dragover', dragOverHandler);
dz.addEventListener('drop', dropHandler);

