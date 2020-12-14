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

function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    ev.dataTransfer.dropEffect = 'move';
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function fileContents(file) {
	var reader = new FileReader();
	reader.onload = function(e) {
        var df = document.getElementById('drop_file');
        df.innerHTML = "<p><strong>" + file.name + ":</strong></p><pre>" +
			           e.target.result.replace(/</g, "&lt;").replace(/>/g, "&gt;") +
			           "</pre>";
	}
	reader.readAsText(file);
}

var dz = document.getElementById('drop_zone');
dz.addEventListener('dragover', dragOverHandler);
dz.addEventListener('drop', dropHandler);

