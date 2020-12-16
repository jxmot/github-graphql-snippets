///////////////////////////////////////////////////////////
// dropit.js: The required code to enable the drag and 
// drop of a file.
//
// This code was created by researching drag-n-drop 
// JavaScript implementations.
//
// It is the minimum requried for just the basics of 
// drag-n-drop. 
//

// File loaded event handler
function fileLoadEnd(ev) {
    var df = document.getElementById('drop_file');
    df.innerHTML = "<p><strong>" + file.name + ":</strong></p><pre>" +
		           ev.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
		           "</pre>";

    // send an event to notify the GraphQL file processing...
    $(document).trigger('fileready', ev.target.result);
}

// Handler for when a file is dropped into
// the target area.
var file;
var reader;
reader = new FileReader();
reader.onload = fileLoadEnd;

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
                file = ev.dataTransfer.items[0].getAsFile();
                console.log('dropped file name = ' + file.name);
                reader.readAsText(file);
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

// Handler for when a file is dropped into
// the target area.
function noDragDrop(ev) {
    console.log('you can\'t touch that');
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

// Set up the minium of handlers for drag-n-drop
var dz = document.getElementById('drop_zone');
dz.addEventListener('dragover', dragOverHandler);
dz.addEventListener('drop', dropHandler);

// disallow poorly aimed droppings....
//var nd = document.getElementById('nodrop');
//nd.addEventListener('dragover', noDragDrop);
//nd.addEventListener('drop', noDragDrop);

