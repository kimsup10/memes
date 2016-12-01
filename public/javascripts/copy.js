//Cross-browser function to select content
function SelectText(element) {
    var doc = document;
    if (doc.body.createTextRange) {
        var range = document.body.createTextRange();
        range.moveToElementText(element);
        range.select();
    } else if (window.getSelection) {
        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(element);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}

function copy(id) {
     //Make the container Div contenteditable
    var img = $($('#attachment-'+id));
    img.attr("contenteditable", true);
    //Select the image
    SelectText(img.get(0));
    //Execute copy Command
    //Note: This will ONLY work directly inside a click listenner
    document.execCommand('copy');
    //Unselect the content
    window.getSelection().removeAllRanges();
    //Make the container Div uneditable again
    $($(img)).removeAttr("contenteditable");
    //Success!!
    copyCount(id);
}

function copyCount(id) {
    $.post("/count",
        {
            attachmentId: id
        });
}