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
        console.log(element);
        range.selectNodeContents(element);
        console.log(range);
        selection.removeAllRanges();
        selection.addRange(range);
        console.log(selection);
    }
}
function copy(id) {
     //Make the container Div contenteditable
    $($('.meme#'+id)).attr("contenteditable", true);
    console.log($($('.meme#'+id)));
    //Select the image
    SelectText($($('.meme#'+id)).get(0));
    //Execute copy Command
    //Note: This will ONLY work directly inside a click listenner
    document.execCommand('copy');
    //Unselect the content
    window.getSelection().removeAllRanges();
    //Make the container Div uneditable again
    $($(this)).removeAttr("contenteditable");
    //Success!!
    alert("image copied!");
}